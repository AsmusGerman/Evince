import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterService } from 'src/app/core/services/filter.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'evince-general-filter',
  templateUrl: './general-filter.component.html',
  styleUrls: ['./general-filter.component.scss']
})
export class GeneralFilterComponent implements OnInit {

  @Input () origenes: Array<{}>;
  @Input () destinos: Array<{}>;
  @Input () origenSeleccionado: string;
  @Input () destinoSeleccionado: string;
  @Input () showSubscribed;
  @Output() showSubscribedEmitter = new EventEmitter<any>();
  @Output() origenSeleccionadoEmitter = new EventEmitter<number>();
  @Output() destinoSeleccionadoEmitter = new EventEmitter<number>();
  
  private origenesDesc: Array<string>;
  private destinosDesc: Array<string>;

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
    this.showSubscribedEmitter.emit(this.showSubscribed);
  }

  //TODO: control de duplicados en selectores de origen y destino
  //TODO: poner una pequenia cruz (o similar) al lado de cada selector para limpiarlo
  changeOrigen(origen: string) {
    var terminalOrigen = this.origenes.find(elem=>elem['origenDesc']==origen);
    this.origenSeleccionadoEmitter.emit(terminalOrigen['origenId']);
  }

  changeDestino(destino: string) {
    var terminalDestino = this.destinos.find(elem=>elem['destinoDesc']==destino);
    this.destinoSeleccionadoEmitter.emit(terminalDestino['destinoId']);
  }

  ngOnChanges() {
    var origenesDesc=[];
    this.origenes.forEach(origen=>{
      origenesDesc.push(origen['origenDesc']);
      });
    this.origenesDesc=origenesDesc;

    var destinosDesc=[];
    this.destinos.forEach(destino=>{
      destinosDesc.push(destino['destinoDesc']);
      });
    this.destinosDesc=destinosDesc;
    }
  

  ngOnInit() {}

}
