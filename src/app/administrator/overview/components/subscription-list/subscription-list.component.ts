import { Component, OnInit } from "@angular/core";
import { FilterService } from 'src/app/core/services/filter.service';

/* const ELEMENT_DATA = [
  {
    position: 1,
    last: "01-01-2020 10:15",
    state: "waiting",
    code: "abc",
    subscription: true
  },
  {
    position: 2,
    last: "",
    state: "disabled",
    code: "aebc",
    subscription: false
  },
  {
    position: 3,
    last: "05-01-2020 16:15",
    state: "on the road",
    code: "aedbc",
    subscription: false
  },
  {
    position: 4,
    last: "10-01-2020 13:00",
    state: "waiting",
    code: "adbc",
    subscription: true
  },
  {
    position: 5,
    last: "08-01-2020 15:30",
    state: "waiting",
    code: "bcf",
    subscription: false
  },
  {
    position: 7,
    last: "11-01-2020 18:00",
    state: "on the road",
    code: "bcfg",
    subscription: false
  },
  {
    position: 8,
    last: "08-01-2020 18:00",
    state: "disabled",
    code: "bcg",
    subscription: false
  },
  {
    position: 9,
    last: "13-02-2020 04:15",
    state: "disabled",
    code: "bcgi",
    subscription: true
  }
];
 */
@Component({
  selector: "evince-subscription-list",
  templateUrl: "./subscription-list.component.html",
  styleUrls: ["./subscription-list.component.scss"]
})
export class SubscriptionListComponent implements OnInit {
  public iDisplayedColumns: string[] = ["code", "last", "state","subscription", "analyze"];
  public iDataSource = this.filterService.ELEMENT_DATA;
  isChecked: boolean;

  
  constructor(private filterService: FilterService) {}

  ngOnInit() {
    this.filterService.currentCheck.subscribe(check => this.isChecked = check);
    this.filterService.ELEMENT_DATA.
  }

  analyze(row) {
    console.log("showing report");
  }
}
