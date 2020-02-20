import { Injectable } from "@angular/core";
import { Subject, Observable, timer } from "rxjs";
import { takeUntil, repeatWhen, map } from "rxjs/operators";
import * as moment from "moment";

@Injectable()
export class CurrentTravelTimerService {
  public Timer: Observable<string>;

  private iStart$ = new Subject<void>();
  private iStop$ = new Subject<void>();

  constructor() {
    this.Timer = timer(0, 1000).pipe(
      takeUntil(this.iStop$),
      repeatWhen(() => this.iStart$),
      map(time =>
        moment("00:00:00", "HH:mm:ss")
          .add(time, "second")
          .format("HH:mm:ss")
      )
    );
  }

  public StartTravelTimer() {
    this.iStart$.next();
  }

  public StopTravelTimer() {
    this.iStop$.next();
  }
}
