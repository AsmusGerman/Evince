import { Injectable } from "@angular/core";
import { Subject, Observable, timer } from "rxjs";
import { takeUntil, repeatWhen, map, share, scan } from "rxjs/operators";
import * as moment from "moment";

@Injectable()
export class CurrentTravelTimerService {
  public Timer: Observable<string>;

  private iStartAt: string;
  private iStart$ = new Subject<void>();
  private iStop$ = new Subject<void>();

  constructor() {
    this.Timer = timer(0, 1000).pipe(
      takeUntil(this.iStop$),
      repeatWhen(() => this.iStart$),
      map(time =>
        moment(this.iStartAt, "HH:mm:ss")
          .add(time, "second")
          .format("HH:mm:ss")
      ),
      share()
    );
  }

  public StartTravelTimer(start) {
    //date as seconds
    this.iStartAt = moment(start).format("HH:mm:ss");
    console.log({ startat: this.iStartAt });
    this.iStart$.next();
  }

  public StopTravelTimer() {
    this.iStop$.next();
  }
}
