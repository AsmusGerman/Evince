import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/core/services/filter.service';

@Component({
  selector: 'evince-subscription-filter',
  templateUrl: './subscription-filter.component.html',
  styleUrls: ['./subscription-filter.component.scss']
})
export class SubscriptionFilterComponent implements OnInit {

  isChecked: boolean;
  
  constructor(private filterService: FilterService) { }

  onChange(ch: boolean) {
    console.log(ch);
    this.filterService.changeChecked(ch);
  }

  ngOnInit() {
    this.filterService.currentCheck.subscribe(check => this.isChecked = check)
  }
}
