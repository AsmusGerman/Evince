import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Viaje } from "src/app/core/model/viaje";
import { Recorrido } from "src/app/core/model/recorrido";
import { Select } from "@ngxs/store";
import { DriverState } from "src/app/driver/store/driver.state";
import { Observable, zip } from "rxjs";

@Component({
  selector: "evince-next-travel-card",
  templateUrl: "./next-travel-card.component.html"
})
export class NextTravelCardComponent implements OnInit {
  @Input()
  public iViajeActual: Viaje;

  @Select(DriverState.CurrentRoute)
  public iRecorridoActual: Observable<Recorrido>;

  @Output() onStartTravelTriggered = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  public start($event) {
    this.onStartTravelTriggered.emit($event);
  }
}
