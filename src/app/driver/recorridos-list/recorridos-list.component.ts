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
    public iDataSource=this.dataService.getRecorridos();
    public fecha:Date = new Date();
    public cronos;
    public tiempoEnSegs=0;
    public tiempoUltimoViaje;

  comenzarViaje(viaje) {
    this.dataService.comenzarViaje(viaje);
  }

  detenerViajeActual(viaje) {
    this.dataService.detenerViaje(viaje);
  } 

  mostrarReporte(viaje) {
    this.dataService.setViajeReporte(viaje);
    this.router.navigate(['driver/reporte-viaje/']);
  }

  nuevoRetraso(viajeParam:string) {
    this.router.navigate(['driver/retraso/']);
  }

  demoraTotal(viaje) {
    var demoraTotal=0;
    viaje.retrasos.forEach(retraso => {
      demoraTotal+=retraso.tiempo;
    });
    return demoraTotal;
  }

  comprobarDemora(viaje) {
    var duracionViajeEnSegs=moment.duration(moment(viaje.fechaHoraLlegadaEstipuladas)
    .diff(moment(viaje.fechaHoraSalidaEstipuladas)))
    .asSeconds();
    var tiempoDemora = this.dataService.tiempoEnSegs-this.demoraTotal(viaje);
    if(tiempoDemora>duracionViajeEnSegs) {
      viaje["tiempoDemora"]=tiempoDemora;
      this.dataService.setViajeActual(viaje);
      this.router.navigate(['driver/retraso']);
    }
    else {
      this.detenerViajeActual(viaje);
    }

  }

  constructor(private router: Router, private dataService: DataService, private recorridoService: RecorridoService,
    private viajeService: ViajeService) { }

  ngOnInit() { }
}
