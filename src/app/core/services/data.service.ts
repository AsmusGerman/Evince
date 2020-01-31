import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RecorridoService } from 'src/app/core/services/recorrido.service';
import { Viaje } from '../model/viaje';

@Injectable()
export class DataService implements OnInit{
  tiempoEnSegs:number=0;
  tiempoCrono:string="";
  cronos:any;

  constructor(private recorridoService: RecorridoService) {}

  private dataSource=this.recorridoService.getRecorridos();

  private viajeActual:Viaje=null;
  private viajeSiguiente:Viaje=null;

  getViajeActual() {
    return this.viajeActual;
  }

  getViajeSiguiente() {
    this.dataSource.filter(e=>{
      e.viajes.filter(ee=> {
        if(ee.orden==this.viajeActual.orden+1){
          this.viajeSiguiente=ee;
        }
      });
    });
    return this.viajeSiguiente;
  }

  resetViajeActual() {
    this.viajeActual = new Viaje();
  }

  getRecorridos() {
    return this.dataSource;
  }

  getTiempoCrono():string{
    return this.tiempoCrono;
  }

  comenzarViaje(viaje) {
    this.init();
    //this.tiempoCrono=this.dataService.getTiempoCrono();
    //this.actualizarTiempo();
    viaje.actual=true;
    viaje.fechaHoraRealSalida="0h0m0s";
    this.viajeActual=viaje;
    //localStorage.setItem(viaje.id, JSON.stringify(viaje));
    this.dataSource.filter(e=>{
      e.viajes.filter(ee=> {
       if(ee.orden==viaje.orden+1){
         this.viajeSiguiente=ee;
        }
      });
     });
     //localStorage.setItem("Demora",JSON.stringify(false));
  }

  timer() {
    this.tiempoEnSegs=this.tiempoEnSegs+1;
    var hours = Math.floor((this.tiempoEnSegs*1000 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((this.tiempoEnSegs*1000 % (1000 * 60 * 60)) / (1000 *60));
    var seconds = Math.floor(this.tiempoEnSegs*1000 % (1000 * 60) / 1000);
    
    this.tiempoCrono=hours+"h"+minutes+"m"+seconds+"s";
  }

  init() {
    this.cronos = setInterval((e)=>{this.timer()}, 1000);
  }

  reset() {
    this.tiempoEnSegs = 0;
  }

  stop() {
    clearInterval(this.cronos);
  }

  ngOnInit() {

  }

}