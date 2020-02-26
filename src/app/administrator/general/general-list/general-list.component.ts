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
  @Output() onSubscriptionChanges = new EventEmitter<number>();
  @Output() onAnalysisRequested = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}
  
  changeSubscription($event) {
    this.onSubscriptionChanges.emit($event);
  }

  analyze($event) {
    this.onAnalysisRequested.emit($event);
  }
}
