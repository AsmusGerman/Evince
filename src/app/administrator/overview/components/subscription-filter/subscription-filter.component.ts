import { Component, OnInit, Input } from '@angular/core';
import { FilterService } from 'src/app/core/services/filter.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'evince-subscription-filter',
  templateUrl: './subscription-filter.component.html',
  styleUrls: ['./subscription-filter.component.scss']
})
export class SubscriptionFilterComponent implements OnInit {

  @Input() isChecked: boolean;
  public form:FormGroup;
  origenControl:FormControl;
  destinoControl:FormControl;
  
  constructor(private filterService: FilterService) {
    this.form = new FormGroup({
      origenControl: new FormControl(),
      destinoControl: new FormControl()
    })
  }

  public origen:string;
  public destino:string;
  public search:string;

  changeOrigen(origen: string) {
    this.filterService.changeOrigen(origen);
  }

  changeDestino(destino: string) {
    this.filterService.changeDestino(destino);
  }

  onChange(ch: boolean) {
    this.filterService.changeChecked(ch);
  }

  searchFilter(e) {
    this.filterService.setSearchFilter(e);
  }

  ngOnInit() {
    //this.filterService.currentCheck.subscribe(check => this.isChecked = check);
    this.filterService.origenSelect.subscribe(data => this.origen = data);
    this.filterService.destinoSelect.subscribe(data => this.destino = data);
    //this.filterService.searchFilter.subscribe(data=>this.search = data);
  }
}
