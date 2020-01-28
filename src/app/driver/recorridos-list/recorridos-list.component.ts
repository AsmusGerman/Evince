import { Component, OnInit } from "@angular/core";
import {MatInputModule} from '@angular/material';
import { Viaje } from 'src/app/core/model/viaje';

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

/*     timer() {
      this.tiempo = parseInt((<HTMLInputElement>document.getElementById('time')).value);
      (<HTMLInputElement>document.getElementById('time')).value = eval(this.tiempo + 1);
    } */

    timer() {
      this.tiempo=this.tiempo+1;
      console.log(this.tiempo);
    }

    init() {
      this.cronos = setInterval((e)=>{this.timer()}, 1000);
    }

    /* reset() {
      this.tiempo = parseInt((<HTMLInputElement>document.getElementById('time')).value);
      (<HTMLInputElement>document.getElementById('time')).value = "0";
    } */

    reset() {
      this.tiempo = 0;
    }

    stop() {
      clearInterval(this.cronos);
    }

   getViajeActual() {
     this.iDataSource.filter(e=>{
       e.viajes.filter(ee=> {
        if(ee.actual==true)
          this.viajeActual=ee;
       });
      });
  }

  comenzarViaje(viaje) {
    this.init();
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
  }

  detenerViajeActual() {
    this.tiempoUltimoViaje=this.tiempo;
    this.stop();
    this.reset();
    this.iDataSource.filter(e=>{
      e.viajes.filter(ee=> {
       if(ee.actual==true) {
         this.viajeActual=new Viaje();
         ee.actual=false;
        }
      });
     });
  }

  getViajeSiguiente() {
    this.iDataSource.filter(e=>{
      e.viajes.filter(ee=> {
       if(ee.actual==true)
         this.viajeActual=ee;
      });
     });
 }

  constructor() {}

  ngOnInit() {
    this.getViajeActual();
  }

}
