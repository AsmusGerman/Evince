import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Viaje } from "src/app/core/model/viaje";
import { Select } from "@ngxs/store";
import { DriverState } from "src/app/driver/store/driver.state";
import { Observable } from "rxjs";
import { CurrentTravelTimerService } from "src/app/driver/services/current-travel-timer.service";
import { Recorrido } from "src/app/core/model/recorrido";

@Component({
  selector: "evince-current-travel-card",
  templateUrl: "./current-travel-card.component.html"
})
export class CurrentTravelCardComponent implements OnInit {
  @Select(DriverState.CurrentTravel)
  public iViajeActual: Observable<Viaje>;

  @Select(DriverState.CurrentRoute)
  public iRecorridoActual: Observable<Recorrido>;

  public iTimer: Observable<string>;

  @Output() onShowCurrentRoadMap = new EventEmitter<any>();

  constructor(private iCurrentTravelTimerService: CurrentTravelTimerService) {}

  ngOnInit() {
    this.iTimer = this.iCurrentTravelTimerService.Timer;
  }

  public roadmap(travel: number) {
    this.onShowCurrentRoadMap.emit({ travel });
  }
}
