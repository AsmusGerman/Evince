import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "evince-general-list",
  templateUrl: "./general-list.component.html"
})
export class GeneralListComponent implements OnInit {
  public iDisplayedColumns: string[] = [
    "code",
    "origen",
    "destino",
    "last",
    "state",
    "subscription",
    "analyze"
  ];

  @Input() iRecorridos: Array<any>;
  @Output() onSubscriptionChanges = new EventEmitter<any>();
  @Output() onAnalysisRequested = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}
  
  changeSubscription(id: number, subscription: boolean) {
    this.onSubscriptionChanges.emit({id, subscription});
  }

  analyze($event) {
    this.onAnalysisRequested.emit($event);
  }
}
