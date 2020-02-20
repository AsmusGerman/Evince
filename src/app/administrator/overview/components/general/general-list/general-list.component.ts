import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { FilterService } from 'src/app/core/services/filter.service';


@Component({
  selector: "evince-general-list",
  templateUrl: "./general-list.component.html",
  styleUrls: ["./general-list.component.scss"]
})
export class GeneralListComponent implements OnInit {
  public iDisplayedColumns: string[] = ["code", "origen", "destino", "last", "state","subscription","analyze"];
  @Input () iRecorridos: Array<any>;
  @Output() onClick = new EventEmitter<any>();
  @Output() iCurrentListViewEmitter = new EventEmitter<string>();
  @Output() iCurrentChartViewEmitter = new EventEmitter<string>();
  @Output() recorridoParaAnalizarEmitter = new EventEmitter<any>();
  constructor(private filterService: FilterService) {}

  ngOnInit() {

  }

  enviarOnClick(id,subscription) {
    subscription=!subscription;
    this.onClick.emit({id,subscription});
  }

  getRecorridoAAnalizar(recorridoId) {
    console.log("cambio icurrentrecorridoview");
    this.iCurrentListViewEmitter.emit('recorrido-list');
    console.log("cambio icurrentChartView");
    this.iCurrentChartViewEmitter.emit('recorrido-chart');
    console.log("emitiendo el recorrido ", recorridoId);
    this.recorridoParaAnalizarEmitter.emit(recorridoId);
  }


}
