import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterService } from 'src/app/core/services/filter.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'evince-subscription-filter',
  templateUrl: './subscription-filter.component.html',
  styleUrls: ['./subscription-filter.component.scss']
})
export class SubscriptionFilterComponent implements OnInit {

  @Input () origenes: Array<string>;
  @Input () destinos: Array<string>;
  //@Input () onlySubs: boolean;
  @Input () showSubscribed;
  @Output() showSubscribedEmitter = new EventEmitter<any>();
  
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

  showSubscribedChange(){
    this.showSubscribed ? this.showSubscribed=false : this.showSubscribed=true;
    console.log("voy a enviar "+this.showSubscribed+"desde el filtro");
    this.showSubscribedEmitter.emit(this.showSubscribed);
  }

  changeOrigen(origen: string) {
    console.log("El nuevo origen elegido es "+origen);
    //this.filterService.changeOrigen(origen);
  }

  changeDestino(destino: string) {
    console.log("El nuevo destino es "+destino);
    //this.filterService.changeDestino(destino);
  }

/*   onChange(checkSubs: boolean) {
    console.log(this.showSubscribed);
    this.showSubscribed.emit(checkSubs);
    //this.filterService.changeChecked(ch);
  } */

  ngOnInit() {
    //this.filterService.currentCheck.subscribe(check => this.isChecked = check);
    this.filterService.origenSelect.subscribe(data => this.origen = data);
    this.filterService.destinoSelect.subscribe(data => this.destino = data);
    //this.filterService.searchFilter.subscribe(data=>this.search = data);
  }
}
