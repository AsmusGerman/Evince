import {
  DriverStateModel,
  StartTravel,
  StopTravel,
  NewDelay,
  NextTravel
} from "./driver.model";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { CurrentTravelTimerService } from "../services/current-travel-timer.service";
import { DriverService } from "src/app/core/services/driver.service";
import { zip } from "rxjs";
import { tap, filter, map, switchMap } from "rxjs/operators";
import { Viaje } from "src/app/core/model/viaje";
import { Recorrido } from "src/app/core/model/recorrido";

const defaults: DriverStateModel = {
  travel: null,
  route: null
};

@State<DriverStateModel>({
  name: "driver",
  defaults
})
export class DriverState {
  constructor(
    private iCurrentTravelTimerService: CurrentTravelTimerService,
    private iDriverService: DriverService
  ) {}

  @Selector()
  static CurrentTravel(state: DriverStateModel): Viaje {
    return state.travel;
  }

  @Selector()
  static CurrentRoute(state: DriverStateModel): Recorrido {
    return state.route;
  }

  @Selector()
  static CurrentRouteFrom(state: DriverStateModel): string | null {
    if (state.route.viajes.length > 0)
      return state.route.viajes[0].trayecto.terminalOrigenCodigo;

    return;
  }

  @Selector()
  static CurrentRouteTo(state: DriverStateModel): string | null {
    const viajes = state.route.viajes;
    return viajes.length > 0
      ? viajes[viajes.length - 1].trayecto.terminalDestinoCodigo
      : null;
  }

  @Action(NextTravel)
  nextTravel(ctx: StateContext<DriverStateModel>) {
    return this.iDriverService.RoutesClient.next().pipe(
      tap(route => {
        const travels = route.viajes.sort(v => v.orden);
        const current = ctx.getState().route;
        // se filtran los finalizados
        const travel = travels.filter(v => v.estado != 2)[0];
        // si no hay recorrido o es un nuevo recorrido
        if (!current || route.id != current.id) {
          ctx.patchState({ route, travel });
        } else {
          ctx.patchState({ travel });
        }
      })
    );
  }

  @Action(StartTravel)
  startTravel(ctx: StateContext<DriverStateModel>, action: StartTravel) {
    const { travel } = action.payload;
    // se indica el inicio del viaje
    return this.iDriverService.TravelClient.start({ travel }).pipe(
      // se obtiene el viaje actualizado
      switchMap(() => ctx.dispatch(new NextTravel())),
      tap(() => this.iCurrentTravelTimerService.StartTravelTimer())
    );
  }

  @Action(StopTravel)
  stopTravel(ctx: StateContext<DriverStateModel>, action: StopTravel) {
    return this.iDriverService.TravelClient.stop(action.payload).pipe(
      // se obtiene el viaje actualizado
      switchMap(() => ctx.dispatch(new NextTravel())),
      tap(() => this.iCurrentTravelTimerService.StopTravelTimer())
    );
  }

  @Action(NewDelay)
  delay(ctx: StateContext<DriverStateModel>, action: NewDelay) {
    const travel = ctx.getState().travel.id;
    return this.iDriverService.DelayClient.push({
      ...action.payload,
      travel
    });
  }
}
