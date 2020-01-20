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
        "diaSalida" : "30/06/2020",
        "diaLlegada" : "30/06/2020",
        "horaEstipuladaSalida" : "18:00",
        "horaEstipuladaLlegada" : "22:00",
        "horaRealSalida" : "",
        "horaRealLlegada" : "",
        "recorridoId" : "A-C",
        "actual" : true,
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
        "horaEstipuladaSalida" : "22:00",
        "horaEstipuladaLlegada" : "23:00",
        "horaRealSalida" : "",
        "horaRealLlegada" : "",
        "recorridoId" : "A-C",
        "actual" : false,
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
        "horaEstipuladaSalida" : "08:00",
        "horaEstipuladaLlegada" : "09:00",
        "horaRealSalida" : "",
        "horaRealLlegada" : "",
        "recorridoId" : "F-I",
        "actual" : false,
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
        "horaEstipuladaSalida" : "09:00",
        "horaEstipuladaLlegada" : "11:00",
        "horaRealSalida" : "",
        "horaRealLlegada" : "",
        "recorridoId" : "F-I",
        "actual" : false,
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
        "horaEstipuladaSalida" : "09:00",
        "horaEstipuladaLlegada" : "13:00",
        "horaRealSalida" : "",
        "horaRealLlegada" : "",
        "recorridoId" : "F-I",
        "actual" : false,
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
    public viajeActual:Viaje;

   getViajeActual() {
     this.iDataSource.filter(e=>{
       e.viajes.filter(ee=> {
        if(ee.actual==true)
          this.viajeActual=ee;
       });
      });
  }

  detenerViajeActual() {
    console.log("viaje detenido");
    this.iDataSource.filter(e=>{
      e.viajes.filter(ee=> {
       if(ee.actual==true) {
        console.log(this.viajeActual);
        console.log(ee.actual);
         this.viajeActual=new Viaje();
         ee.actual=false;
         console.log(this.viajeActual);
         console.log(ee.actual);
        }
      });
     });
     console.log(this.iDataSource);
 }

  constructor() {}

  ngOnInit() {
    this.getViajeActual();
    console.log(this.getViajeActual());
  }

}
