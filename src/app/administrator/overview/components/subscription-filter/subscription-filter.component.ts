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
  @Input () origenSeleccionado: string;
  @Input () destinoSeleccionado: string;
  @Input () showSubscribed;
  @Output() showSubscribedEmitter = new EventEmitter<any>();
  @Output() origenSeleccionadoEmitter = new EventEmitter<string>();
  @Output() destinoSeleccionadoEmitter = new EventEmitter<string>();
  
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
    this.origenSeleccionadoEmitter.emit(origen);
  }

  changeDestino(destino: string) {
    this.destinoSeleccionadoEmitter.emit(destino);
  }

  ngOnInit() {
    
  }
}
