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
  @Output() onClick = new EventEmitter(Array<string,boolean>()); 
  constructor(private filterService: FilterService) {}

  ngOnInit() {
    //this.filterService.currentCheck.subscribe(check => this.subsOnly = check);
    //this.filterService.currentData.subscribe(data => this.iRecorridos = data);
  }

  changeChecked(elementCode: any){
    //this.filterService.updateData(elementCode);
  }
}
