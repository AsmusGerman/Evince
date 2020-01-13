import { Component, OnInit } from "@angular/core";

const ELEMENT_DATA = [
  { position: 1, code: "abc", subscription: true },
  { position: 2, code: "aebc", subscription: false },
  { position: 3, code: "aedbc", subscription: false },
  { position: 4, code: "adbc", subscription: true },
  { position: 5, code: "bcf", subscription: false },
  { position: 7, code: "bcfg", subscription: false },
  { position: 8, code: "bcg", subscription: false },
  { position: 9, code: "bcgi", subscription: true }
];

@Component({
  selector: "evince-subscription-list",
  templateUrl: "./subscription-list.component.html",
  styleUrls: ["./subscription-list.component.scss"]
})
export class SubscriptionListComponent implements OnInit {
  public iDisplayedColumns: string[] = ["code", "subscription", "analyze"];
  public iDataSource = ELEMENT_DATA;
  constructor() {}

  ngOnInit() {}

  analyze(row) {
    console.log("showing report");
  }
}
