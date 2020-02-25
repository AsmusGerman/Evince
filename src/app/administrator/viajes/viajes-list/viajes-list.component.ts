import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  EventEmitter,
  Output
} from "@angular/core";

@Component({
  selector: "evince-viajes-list",
  templateUrl: "./viajes-list.component.html"
})
export class ViajesListComponent implements OnInit {
  @Input() iViajes: any;
  @Input() iOrigen: string;
  @Input() iDestino: string;
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
