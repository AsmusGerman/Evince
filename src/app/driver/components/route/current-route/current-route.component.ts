import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
  OnInit
} from "@angular/core";
Output;
import { Viaje } from "src/app/core/model/viaje";
import * as moment from "moment";
import { timer, Subject, Observable } from "rxjs";
import { takeUntil, repeatWhen, take } from "rxjs/operators";
import { CurrentTravelTimerService } from "src/app/driver/services/current-travel-timer.service";
import { MatBottomSheetRef, MatBottomSheet } from "@angular/material";
import { DelayComponent } from "../../delay/delay.component";
import { Store, Select } from "@ngxs/store";
import { StartTravel, StopTravel } from "src/app/driver/store/driver.model";
import { ActivatedRoute } from "@angular/router";
import { Recorrido } from "src/app/core/model/recorrido";
import { DriverService } from "src/app/core/services/driver.service";
import { DriverState } from "src/app/driver/store/driver.state";

@Component({
  selector: "evince-current-route",
  templateUrl: "./current-route.component.html",
  styles: []
})
export class CurrentRouteComponent implements OnInit {
  public iTimer: string;

  @Select(DriverState.CurrentTravel)
  public iViajeActual: Observable<Viaje>;

  public iRecorridoActual: Recorrido;

  constructor(
    private iDriverService: DriverService,
    private iCurrentTravelTimerService: CurrentTravelTimerService,
    private iRoute: ActivatedRoute,
    private iStore: Store,
    private iMatBottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {
    const id = this.iRoute.snapshot.paramMap.get("id");
    this.iDriverService.RoutesClient.get(Number(id))
      .pipe(take(1))
      .subscribe(recorrido => {
        this.iRecorridoActual = recorrido;
        const first = this.iRecorridoActual.viajes[0];
        this.start(first.id);
      });

    this.iCurrentTravelTimerService.Timer.subscribe(
      timer => (this.iTimer = timer)
    );
  }

  public stop(travel: number) {
    this.iStore.dispatch(new StopTravel({ travel }));
  }

  public start(travel: number) {
    this.iStore.dispatch(
      new StartTravel({ route: this.iRecorridoActual.id, travel })
    );
  }

  public delay() {
    this.iMatBottomSheet.open(DelayComponent);
  }
}
