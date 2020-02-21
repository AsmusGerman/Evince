import { Component, OnInit, Input } from "@angular/core";
import { Viaje } from 'src/app/core/model/viaje';

@Component({
  selector: "evince-current-travel-card",
  templateUrl: "./current-travel-card.component.html"
})
export class CurrentTravelCardComponent implements OnInit {
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
  constructor() {}

  ngOnInit() {}
}
