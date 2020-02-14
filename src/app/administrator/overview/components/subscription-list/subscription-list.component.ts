import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { FilterService } from 'src/app/core/services/filter.service';


@Component({
  selector: "evince-subscription-list",
  templateUrl: "./subscription-list.component.html",
  styleUrls: ["./subscription-list.component.scss"]
})
export class SubscriptionListComponent implements OnInit {
  public iDisplayedColumns: string[] = ["code", "origen", "destino", "last", "state","subscription"];
  //public iDataSource = Array<any>();
  //isChecked: boolean;
  @Input () iRecorridos: Array<any>;
  @Output() onClick = new EventEmitter<any>();
  constructor(private filterService: FilterService) {}

  ngOnInit() {
    //this.filterService.currentCheck.subscribe(check => this.subsOnly = check);
    //this.filterService.currentData.subscribe(data => this.iRecorridos = data);
  }

  enviarOnClick(id,subscription) {
    console.log("ESTOY CAMBIANDO EL CHECK EN LA LISTA PARA EL ID "+id);
    subscription=!subscription;
    this.onClick.emit({id,subscription});
  }
}
