import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { FilterService } from 'src/app/core/services/filter.service';


@Component({
  selector: "evince-subscription-list",
  templateUrl: "./subscription-list.component.html",
  styleUrls: ["./subscription-list.component.scss"]
})
export class SubscriptionListComponent implements OnInit {
  public iDisplayedColumns: string[] = ["code", "origen", "destino", "last", "state","subscription","analyze"];
  @Input () iRecorridos: Array<any>;
  @Output() onClick = new EventEmitter<any>();
  @Output() iCurrentRecorridoViewEmitter = new EventEmitter<string>();
  @Output() recorridoParaAnalizarEmitter = new EventEmitter<any>();
  constructor(private filterService: FilterService) {}

  ngOnInit() {

  }

  enviarOnClick(id,subscription) {
    subscription=!subscription;
    this.onClick.emit({id,subscription});
  }

  analyze(recorrido) {
    console.log("cambio icurrentrecorridoview");
    this.iCurrentRecorridoViewEmitter.emit('recorrido-report');
    console.log("emitiendo el recorrido ", recorrido);
    this.recorridoParaAnalizarEmitter.emit(recorrido);
  }


}
