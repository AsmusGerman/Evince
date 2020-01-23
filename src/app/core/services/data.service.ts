import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService{
  tiempo:number=0;
  tiempoCrono:string="";
  cronos:any;

  getTiempoCrono():string{
    return this.tiempoCrono;
  }

  timer() {
    this.tiempo=this.tiempo+1;
    var hours = Math.floor((this.tiempo*1000 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((this.tiempo*1000 % (1000 * 60 * 60)) / (1000 *60));
    var seconds = Math.floor(this.tiempo*1000 % (1000 * 60) / 1000);
    
    this.tiempoCrono=hours+"h"+minutes+"m"+seconds+"s";
  }

  init() {
    this.cronos = setInterval((e)=>{this.timer()}, 1000);
  }

  reset() {
    this.tiempo = 0;
  }

  stop() {
    clearInterval(this.cronos);
  }

}