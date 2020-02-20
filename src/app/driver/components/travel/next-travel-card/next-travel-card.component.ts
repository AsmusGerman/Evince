import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Viaje } from 'src/app/core/model/viaje';

@Component({
  selector: "evince-next-travel-card",
  templateUrl: "./next-travel-card.component.html"
})
export class NextTravelCardComponent implements OnInit {
  /** Nombre de la terminal de origen del recorrido
   * @property
   * @returns {string}
   */
  @Input() iTerminalOrigen: string;

  /** Nombre de la terminal destino del recorrido
   * @property
   * @returns {string}
   */
  @Input() iTerminalDestino: string;

  @Input() iViajeActual: Viaje;

  @Output() onStartTravelTriggered = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  public start() {
    this.onStartTravelTriggered.emit(this.iViajeActual.id);
  }
}
