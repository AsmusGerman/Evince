import { Component, OnInit, ɵConsole } from "@angular/core";
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
        "tiempoEnSegsEstipulado": 10,
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
        },
        "retrasos" : []
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
        "tiempoEnSegsEstipulado": 10,
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
        },
        "retrasos" : []
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
        "tiempoEnSegsEstipulado": 10,
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
        },
        "retrasos" : []
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
        "tiempoEnSegsEstipulado": 10,
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
        },
        "retrasos" : []
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
        "tiempoEnSegsEstipulado": 10,
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
        },
        "retrasos" : []
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
    public tiempoEnSegs=0;
    public tiempoUltimoViaje;
    public tiempoCrono;


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
    viaje.horaRealSalida="0h0m0s";
    this.viajeActual=viaje;
    localStorage.setItem('ViajeActual', JSON.stringify(this.viajeActual));
    //localStorage.setItem(viaje.id, JSON.stringify(viaje));
    this.iDataSource.filter(e=>{
      e.viajes.filter(ee=> {
       if(ee.orden==viaje.orden+1){
         this.viajeSiguiente=ee;
         ee.siguiente=true;
        }
      });
     });
     localStorage.setItem("Demora",JSON.stringify(false));
  }

  detenerViajeActual() {
    this.tiempoUltimoViaje=this.tiempoCrono;
    this.dataService.stop();
    this.dataService.reset();
    var viaje=JSON.parse(localStorage.getItem("ViajeActual"));

    this.iDataSource.filter(recorrido=>{
      recorrido.viajes.filter(viajeFiltro=> {
        if(viajeFiltro.id==viaje.id){
          viajeFiltro.actual=false;
          viajeFiltro.horaRealLlegada=this.tiempoUltimoViaje;
          viajeFiltro.retrasos=viaje.retrasos;
        }
      });
    });

    this.viajeActual=new Viaje();
    localStorage.setItem(viaje.id,JSON.stringify(viaje));
  }

  getViajeSiguiente() {
    this.iDataSource.filter(e=>{
      e.viajes.filter(ee=> {
       if(ee.actual==true)
         this.viajeActual=ee;
      });
     });
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
    console.log(viaje.retrasos);
    viaje.retrasos.forEach(retraso => {
      demoraTotal+=retraso.tiempo;
    });
    console.log("DEMORA TOTAL: "+demoraTotal);
    return demoraTotal;
  }

  comprobarDemora() {
    var viaje=JSON.parse(localStorage.getItem("ViajeActual"));
    console.log("COMPROBANDO DEMORA PARA EL VIAJE: "+viaje.retrasos);
    console.log("RESTA");
    console.log(this.dataService.tiempoEnSegs-this.demoraTotal(viaje));
    if(this.dataService.tiempoEnSegs-this.demoraTotal(viaje)>viaje.tiempoEnSegsEstipulado) {

      localStorage.setItem('Demora',JSON.stringify(true));
      this.router.navigate(['driver/retraso/'+viaje.id]);
    }
    else {
      this.detenerViajeActual();
    }

  }

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.getViajeActual();
    this.actualizarTiempo();
    if(JSON.parse(localStorage.getItem("Demora"))) {
      this.detenerViajeActual();
    }
    localStorage.setItem('Demora', JSON.stringify(false));
  }
}
