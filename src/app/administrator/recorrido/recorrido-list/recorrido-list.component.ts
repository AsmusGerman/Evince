import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "evince-recorrido-list",
  templateUrl: "./recorrido-list.component.html"
})
export class RecorridoListComponent implements OnInit {
  @Input() iRecorrido: any;
  @Output() onAnalysisRequested = new EventEmitter<number>();
  public iViajesAgrupados: Array<any>;

  public iDisplayedColumns: string[] = [
    "terminalOrigen",
    "terminalDestino",
    "estado",
    "analyze"
  ];

  constructor() {}

  ngOnInit() {
    var grupoViaje = [];
    var ordenViaje = [];
    for (var viaje of this.iRecorrido.viajes) {
      if (!ordenViaje.includes(viaje.orden)) {
        grupoViaje.push(viaje);
        ordenViaje.push(viaje.orden);
      }
    }
    this.iViajesAgrupados = grupoViaje;
  }

  analyze(id: number) {
    this.onAnalysisRequested.emit(id);
  }
}
