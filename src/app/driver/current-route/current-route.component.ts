import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges
} from "@angular/core";
Output;
import { Viaje } from "src/app/core/model/viaje";
import * as moment from "moment";
import { timer, Subject } from "rxjs";
import { takeUntil, repeatWhen } from "rxjs/operators";

@Component({
  selector: "evince-current-route",
  templateUrl: "./current-route.component.html",
  styles: []
})
export class CurrentRouteComponent implements OnChanges {
  @Input() iViajes: Array<Viaje>;
  @Input() iViajeActualId: number;
  @Output() onStartTravelTriggered = new EventEmitter<string>();
  @Output() onStopTravelTriggered = new EventEmitter<string>();
  @Output() onDelayTravelTriggered = new EventEmitter<string>();

  public iTimer: string;
  public iViaje: Viaje;

  private iStart$ = new Subject<void>();
  private iStop$ = new Subject<void>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.iViajes && !!changes.iViajes.currentValue) {
      this.iViaje = this.iViajes.find(viaje => viaje.estado == "actual");
      timer(0, 1000)
        .pipe(
          takeUntil(this.iStop$),
          repeatWhen(() => this.iStart$)
        )
        .subscribe(time => {
          this.iTimer = moment("00:00:00", "HH:mm:ss")
            .add(time, "second")
            .format("HH:mm:ss");
        });
    }
  }

  public stop(pTravelId: string) {
    this.iStop$.next();
    this.onStopTravelTriggered.emit(pTravelId);
  }

  public start(pTravelId: string) {
    this.iStart$.next();
    this.onStartTravelTriggered.emit(pTravelId);
  }

  public delay(pTravelId: string) {
    this.onDelayTravelTriggered.emit(pTravelId);
  }
}
