import { Component, OnInit, ɵConsole } from "@angular/core";
import {MatInputModule} from '@angular/material';
import { Viaje } from 'src/app/core/model/viaje';
import { DataService } from 'src/app/core/services/data.service';
import { Router } from '@angular/router';
import { RecorridoService } from 'src/app/core/services/recorrido.service';
import { ViajeService } from 'src/app/core/services/viaje.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: "evince-recorridos-list",
  templateUrl: "./recorridos-list.component.html",
  styleUrls:["./recorridos-list.component.scss"]
})

export class RecorridosListComponent implements OnInit {
  subscriptionCrono: Subscription;
  subscriptionViajeActual: Subscription;
    public iDataSource=this.dataService.getRecorridos();
    public viajeActual:Viaje=this.dataService.getViajeActual();
    public fecha:Date = new Date();
    public cronos;
    public tiempoEnSegs=0;
    public tiempoUltimoViaje;
    public tiempoCrono : string = this.dataService.getTiempoCrono();

  comenzarViaje(viaje) {
    this.dataService.comenzarViaje(viaje);
  }

  detenerViajeActual(viaje) {
    this.dataService.detenerViaje(viaje);
    console.log(this.dataService.getViajeActual());
  } 

  mostrarReporte(viajeParam) {
    localStorage.setItem('ViajeReporte', JSON.stringify(viajeParam));
    this.router.navigate(['driver/reporte-viaje/'+viajeParam.id]);
  }

  nuevoRetraso(viajeParam:string) {
    this.router.navigate(['driver/retraso/'+viajeParam]);
  }

  demoraTotal(viaje) {
    var demoraTotal=0;
    viaje.retrasos.forEach(retraso => {
      demoraTotal+=retraso.tiempo;
    });
    /* console.log("EL TIEMPO ESTIPULADO EN SEGNUNDOS ES ", 
    moment.duration(moment(viaje.fechaHoraLlegadaEstipuladas)
    .diff(moment(viaje.fechaHoraSalidaEstipuladas)))
    .asSeconds()); */
    return demoraTotal;
  }

  comprobarDemora(viaje) {
    console.log("TIEMPO TOTAL VIAJE: ",this.dataService.tiempoEnSegs);
    console.log("TIEMPO DEMORAS: ",this.demoraTotal(viaje));
    console.log("TIEMPO ESTIPULADO EN SEGUNDOS: ",moment.duration(moment(viaje.fechaHoraLlegadaEstipuladas)
    .diff(moment(viaje.fechaHoraSalidaEstipuladas)))
    .asSeconds());
    if(this.dataService.tiempoEnSegs-this.demoraTotal(viaje)>
    moment.duration(moment(viaje.fechaHoraLlegadaEstipuladas)
    .diff(moment(viaje.fechaHoraSalidaEstipuladas)))
    .asSeconds()) {
      this.dataService.setViajeActual(viaje);
      this.router.navigate(['driver/retraso/'+viaje.id]);
    }
    else {
      this.detenerViajeActual(viaje);
    }

  }

  constructor(private router: Router, private dataService: DataService, private recorridoService: RecorridoService,
    private viajeService: ViajeService) {
      // subscribe to home component messages
/*       this.subscriptionCrono = this.dataService.getTiempoCrono().subscribe(tc => {
        if (tc) {
          this.tiempoCrono=tc.text;

        }
      }); */

/*       this.subscriptionViajeActual = this.dataService.getViajeActual().subscribe(va => {
        if (va) {
          
          this.viajeActual=va;
          console.log("VIAJE ACTUAL != NULL");
          console.log(this.viajeActual);
        }
        else {
          this.viajeActual=null;
          console.log("VIAJE ACTUAL NULL");
        }
      }); */
    }

  ngOnInit() {
    
    //this.viajeActual=this.dataService.getViajeActual();
//    this.iDataSource=this.recorridoService.get_recorridos();
    //console.log(this.iDataSource);
    //this.getViajeActual();
    //console.log(this.dataService.getViajeSiguiente());
    this.dataService.actualizarTiempo();
/*     if(JSON.parse(localStorage.getItem("Demora"))) {
      this.detenerViajeActual(viaje);
    } */
    //localStorage.setItem('Demora', JSON.stringify(false));
  }
}
