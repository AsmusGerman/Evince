import {
  DriverStateModel,
  StartTravel,
  StopTravel,
  NewDelay,
  NextTravel
} from "./driver.model";
import {
  State,
  Selector,
  Action,
  StateContext
} from "@ngxs/store";
import { CurrentTravelTimerService } from "../services/current-travel-timer.service";
import { DriverService } from "src/app/core/services/driver.service";
import { zip } from "rxjs";
import { tap } from "rxjs/operators";
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
    this.iDriverService.RoutesClient.next().subscribe(recorrido => {
      const viaje = recorrido.viajes.find(v => v.orden == 0);
      ctx.patchState({ route: recorrido, travel: viaje });
    });
  }

  @Action(StartTravel)
  startTravel(ctx: StateContext<DriverStateModel>, action: StartTravel) {
    const { travel: travelId, route: routeId } = action.payload;

    const route$ = this.iDriverService.RoutesClient.get(routeId);
    const travel$ = this.iDriverService.TravelClient.get(travelId);

    // cuando se resuelven ambos, se continua
    return zip(route$, travel$).pipe(
      tap(([route, travel]) => {
        this.iCurrentTravelTimerService.StartTravelTimer();
        ctx.patchState({
          travel,
          route
        });
      })
    );
  }

  @Action(StopTravel)
  stopTravel(ctx: StateContext<DriverStateModel>, action: StopTravel) {
    const { travel } = action.payload;
    return this.iDriverService.TravelClient.stop({ travel }).pipe(
      tap(() => {
        this.iCurrentTravelTimerService.StopTravelTimer();
        ctx.setState(defaults);
      })
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
