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
import { timer, Subject, Observable, iif, of } from "rxjs";
import { takeUntil, repeatWhen, take, switchMap, tap } from "rxjs/operators";
import { CurrentTravelTimerService } from "src/app/driver/services/current-travel-timer.service";
import { MatBottomSheetRef, MatBottomSheet } from "@angular/material";
import { DelayComponent } from "../../delay/delay.component";
import { Store, Select } from "@ngxs/store";
import { StartTravel, StopTravel } from "src/app/driver/store/driver.model";
import { ActivatedRoute, Router } from "@angular/router";
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

  @Select(DriverState.CurrentRoute)
  public iRecorridoActual: Observable<Recorrido>;

  constructor(
    private iCurrentTravelTimerService: CurrentTravelTimerService,
    private iStore: Store,
    private iRouter: Router,
    private iRoute: ActivatedRoute,
    private iMatBottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {
    this.iCurrentTravelTimerService.Timer.subscribe(
      timer => (this.iTimer = timer)
    );
  }

  public stop(travel: number, isLast: boolean) {
    this.iStore
      .dispatch(new StopTravel({ travel }))
      .pipe(
        tap(() => {
          if (isLast === true)
            this.iRouter.navigate(["../travels"], { relativeTo: this.iRoute });
        })
      )
      .subscribe();
  }

  public start(travel: number) {
    this.iStore.dispatch(new StartTravel({ travel }));
  }

  public delay() {
    this.iMatBottomSheet.open(DelayComponent);
  }
}
