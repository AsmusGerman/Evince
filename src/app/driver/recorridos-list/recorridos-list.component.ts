import { Component, OnInit } from "@angular/core";
import {MatInputModule} from '@angular/material';
import { Viaje } from 'src/app/core/model/viaje';
import { DataService } from 'src/app/core/services/data.service';
import { Router } from '@angular/router';

var RECORRIDOS = [
  {
    "id" : "A-C",
    "viajes": [
        {
        "id" : "Viaje1Rec1",
        "cantPasajeros" : 43,
        "fechaHoraSalidaEstipuladas" : "30/06/2020 18:00",
        "fechaHoraLlegadaEstipuladas" : "30/06/2020 22:00",
        "diaSalida" : "30/06/2020",
        "diaLlegada" : "30/06/2020",
        "horaEstipuladaSalida" : "18:00",
        "horaEstipuladaLlegada" : "22:00",
        "horaRealSalida" : "",
        "horaRealLlegada" : "",
        "recorridoId" : "A-C",
        "actual" : false,
        "siguiente" : true,
        "orden":1,
        "trayecto" : 
        {
          "trayectoId" : "AB",
          "terminalOrigen" : "A",
          "terminalDestino" : "B"
        }
        },
        {
        "id" : "Viaje2Rec1",
        "diaSalida" : "30/06/2020",
        "diaLlegada" : "30/06/2020",
        "cantPasajeros" : 40,
        "fechaHoraSalidaEstipuladas" : "30/06/2020 22:00",
        "fechaHoraLlegadaEstipuladas" : "30/06/2020 23:00",
        "horaEstipuladaSalida" : "22:00",
        "horaEstipuladaLlegada" : "23:00",
        "horaRealSalida" : "",
        "horaRealLlegada" : "",
        "recorridoId" : "A-C",
        "actual" : false,
        "siguiente": false,
        "orden" :2,
        "trayecto" : 
        {
          "trayectoId" : "BC",
          "terminalOrigen" : "B",
          "terminalDestino" : "C"
        }
        }
    ]
  },
  {
    "id" : "F-I",
    "viajes": [
      {
        "id" : "Viaje1Rec2",
        "diaSalida" : "01/07/2020",
        "diaLlegada" : "01/07/2020",
        "cantPasajeros" : 50,
        "fechaHoraSalidaEstipuladas" : "01/07/2020 08:00",
        "fechaHoraLlegadaEstipuladas" : "01/07/2020 09:00",
        "horaEstipuladaSalida" : "08:00",
        "horaEstipuladaLlegada" : "09:00",
        "horaRealSalida" : "",
        "horaRealLlegada" : "",
        "recorridoId" : "F-I",
        "actual" : false,
        "siguiente": false,
        "orden" :3,
        "trayecto" : 
        {
          "trayectoId" : "FG",
          "terminalOrigen" : "F",
          "terminalDestino" : "G"
        }
      },
      {
        "id" : "Viaje2Rec2",
        "diaSalida" : "01/07/2020",
        "diaLlegada" : "01/07/2020",
        "cantPasajeros" : 54,
        "fechaHoraSalidaEstipuladas" : "01/07/2020 09:00",
        "fechaHoraLlegadaEstipuladas" : "01/07/2020 11:00",
        "horaEstipuladaSalida" : "09:00",
        "horaEstipuladaLlegada" : "11:00",
        "horaRealSalida" : "",
        "horaRealLlegada" : "",
        "recorridoId" : "F-I",
        "actual" : false,
        "siguiente": false,
        "orden" :4,
        "trayecto" : 
        {
          "trayectoId" : "GH",
          "terminalOrigen" : "G",
          "terminalDestino" : "H"
        }
      },
      {
        "id" : "Viaje3Rec2",
        "diaSalida" : "01/07/2020",
        "diaLlegada" : "01/07/2020",
        "cantPasajeros" : 46,
        "fechaHoraSalidaEstipuladas" : "01/07/2020 09:00",
        "fechaHoraLlegadaEstipuladas" : "01/07/2020 13:00",
        "horaEstipuladaSalida" : "09:00",
        "horaEstipuladaLlegada" : "13:00",
        "horaRealSalida" : "",
        "horaRealLlegada" : "",
        "recorridoId" : "F-I",
        "actual" : false,
        "siguiente": false,
        "orden" :5,
        "trayecto" : 
        {
          "trayectoId" : "HI",
          "terminalOrigen" : "H",
          "terminalDestino" : "I"
        }
      }
    ]
}
];

@Component({
  selector: "evince-recorridos-list",
  templateUrl: "./recorridos-list.component.html",
  styleUrls:["./recorridos-list.component.scss"]
})

export class RecorridosListComponent implements OnInit {
    public iDataSource = RECORRIDOS;
    public recorridosOrdenadosPorFecha=RECORRIDOS;
    public viajeActual:Viaje=new Viaje();
    public viajeSiguiente:Viaje=new Viaje();
    public fecha:Date = new Date();
    public cronos;
    public tiempo=0;
    public tiempoUltimoViaje;
    public tiempoCrono;

    message:string="DEFAULT TEXT";

/*     timer(tiempoInicialEnSegs:number) {
      this.tiempo=tiempoInicialEnSegs;
      this.tiempo=this.tiempo+1;
      var hours = Math.floor((this.tiempo*1000 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((this.tiempo*1000 % (1000 * 60 * 60)) / (1000 *60));
      var seconds = Math.floor(this.tiempo*1000 % (1000 * 60) / 1000);
      console.log(this.tiempo);
      console.log(hours+"h"+minutes+"m"+seconds+"s");
      this.tiempoCrono=hours+"h"+minutes+"m"+seconds+"s";
    }

    init() {
      this.cronos = setInterval((e)=>{this.timer(0)}, 1000);
    }

    reset() {
      this.tiempo = 0;
    }

    stop() {
      clearInterval(this.cronos);
    } */

   getViajeActual() {
     this.iDataSource.filter(e=>{
       e.viajes.filter(ee=> {
        if(ee.actual==true)
          this.viajeActual=ee;
       });
      });
  }

  actualizarTiempo(){
    setInterval(()=>{this.tiempoCrono=this.dataService.getTiempoCrono()},1000);
  }

  comenzarViaje(viaje) {
    this.dataService.init();
    //this.tiempoCrono=this.dataService.getTiempoCrono();
    this.actualizarTiempo();
    viaje.siguiente=false;
    viaje.actual=true;
    this.viajeActual=viaje;
    this.iDataSource.filter(e=>{
      e.viajes.filter(ee=> {
       if(ee.orden==viaje.orden+1){
         this.viajeSiguiente=ee;
         ee.siguiente=true;
        }
      });
     });
     console.log(this.tiempoCrono);
  }

  detenerViajeActual(viaje) {
    this.tiempoUltimoViaje=this.tiempoCrono;
    this.dataService.stop();
    this.dataService.reset();
    viaje.actual=false;
    this.viajeActual=new Viaje();
  }

  getViajeSiguiente() {
    this.iDataSource.filter(e=>{
      e.viajes.filter(ee=> {
       if(ee.actual==true)
         this.viajeActual=ee;
      });
     });
 }

  nuevoRetraso(viajeParam:string) {
    this.router.navigate(['driver/retraso/'+viajeParam]);
  }

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.getViajeActual();
    this.actualizarTiempo();
    }
  }
