import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "evince-travels-list",
  templateUrl: "./travels-list.component.html"
})
export class TravelsListComponent implements OnInit {
  @Input() iViajes: any;
  @Output() onAnalysisRequested = new EventEmitter<number>();

  public iDisplayedColumns: string[] = [
    "fechaHoraSalidaEstipulada",
    "fechaHoraLlegadaEstipulada",
    "cantPasajeros",
    "cantButacasColectivo",
    "estado",
    "retrasos"
  ];

  constructor() {}

  ngOnInit() {}

  analyze(id: number) {
    this.onAnalysisRequested.emit(id);
  }
}
