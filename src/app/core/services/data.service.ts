import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { RecorridoService } from 'src/app/core/services/recorrido.service';
import { Viaje } from 'src/app/core/model/viaje';
import * as moment from 'moment';

var RECORRIDOS = [
  {
    "id" : "A-C",
    "viajes": [
        {
        "id" : "Viaje1Rec1",
        "cantPasajeros" : 43,
        "fechaHoraSalidaEstipuladas" : "2020/03/13 18:00:00",
        "fechaHoraLlegadaEstipuladas" : "2020/03/13 18:00:05",
        "fechaHoraRealSalida" : null,
        "fechaHoraRealLlegada" : null,
        "actual" : false,
        "siguiente" : true,
        "estado" : "",
        "orden":1,
        "trayecto" : 
        {
          "id" : "AB",
          "terminalOrigen" : "A",
          "terminalDestino" : "B"
        },
        "retrasos" : []
        },
        {
          "id" : "Viaje2Rec1",
          "cantPasajeros" : 43,
          "fechaHoraSalidaEstipuladas" : "2020/03/13 18:00:00",
          "fechaHoraLlegadaEstipuladas" : "2020/03/13 18:00:03",
          "fechaHoraRealSalida" : null,
          "fechaHoraRealLlegada" : null,
          "actual" : false,
          "siguiente" : false,
          "estado" : "",
          "orden":2,
          "trayecto" : 
          {
            "id" : "AB",
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
        "cantPasajeros" : 43,
        "fechaHoraSalidaEstipuladas" : "2020/12/13 22:06:05",
        "fechaHoraLlegadaEstipuladas" : "2020/12/13 22:06:10",
        "fechaHoraRealSalida" : null,
        "fechaHoraRealLlegada" : null,
        "actual" : false,
        "siguiente" : false,
        "estado" : "",
        "orden":3,
        "trayecto" : 
        {
          "id" : "FG",
          "terminalOrigen" : "F",
          "terminalDestino" : "G"
        },
        "retrasos" : []
      },
      {
        "id" : "Viaje2Rec2",
        "cantPasajeros" : 43,
        "fechaHoraSalidaEstipuladas" : "30/06/2020 18:00",
        "fechaHoraLlegadaEstipuladas" : "30/06/2020 22:00",
        "fechaHoraRealSalida" : null,
        "fechaHoraRealLlegada" : null,
        "actual" : false,
        "siguiente" : false,
        "estado" : "",
        "orden":4,
        "trayecto" : 
        {
          "id" : "GH",
          "terminalOrigen" : "G",
          "terminalDestino" : "H"
        },
        "retrasos" : []
      },
      {
        "id" : "Viaje1Rec3",
        "cantPasajeros" : 43,
        "fechaHoraSalidaEstipuladas" : "30/06/2020 18:00",
        "fechaHoraLlegadaEstipuladas" : "30/06/2020 22:00",
        "fechaHoraRealSalida" : null,
        "fechaHoraRealLlegada" : null,
        "actual" : false,
        "siguiente" : false,
        "estado" : "",
        "orden":5,
        "trayecto" : 
        {
          "id" : "HI",
          "terminalOrigen" : "H",
          "terminalDestino" : "I"
        },
        "retrasos" : []
      }
    ]
}
];

@Injectable()
export class DataService implements OnInit{
  tiempoEnSegs:number=0;
  tiempoDemoraViajeActualEnHMS:string;
  tiempoCrono:string;
  viajeActual:Viaje;
  viajeReporte:Viaje;
  cronos:any;
  private dataSource = RECORRIDOS;
  tiempoUltimoViaje:string;

  constructor(private recorridoService: RecorridoService) {}

  getTiempoCrono():string{
    return this.tiempoCrono;
  }

  setTiempoCrono(tc:string) {
    this.tiempoCrono=tc;
  }

  setViajeActual(va: Viaje) {
    this.viajeActual=va;
  }

  getViajeActual(): Viaje {
    return this.viajeActual;
  }

  setViajeReporte(vr: Viaje) {
    this.viajeReporte=vr;
  }

  getViajeReporte(): Viaje {
    return this.viajeReporte;
  }

   getRecorridos() {
    return this.dataSource;
  }

  actualizarTiempo(){
    setInterval(()=>{this.tiempoCrono=this.getTiempoCrono()},1000);
  }

  comenzarViaje(viaje) {
    this.init();
    this.actualizarTiempo();
    viaje.actual=true;
    viaje.siguiente=false;
    viaje.fechaHoraRealSalida=moment().format("YYYY/MM/DD HH:mm:ss");
    this.setViajeActual(viaje);
     this.dataSource.filter(e=>{
      e.viajes.filter(ee=> {
       if(ee.orden==viaje.orden+1){
         ee.siguiente=true;
        }
      });
     });
    //TODO: ENVIAR AL SERVER INFO DE CAMBIO DE ESTADO Y FECHAHORAREALSALIDA DE VIAJEACTUAL
    //TODO: ENVIAR AL SERVER INFO DE CAMBIO DE ESTADO DE VIAJESIGUIENTE
    }

  detenerViaje(viaje) {
    this.tiempoUltimoViaje=this.tiempoCrono;
    this.stop();
    this.reset();
    this.setTiempoCrono(0+"h "+0+"m "+0+"s");
    this.setViajeActual(null);
    this.dataSource.filter(e=>{
      e.viajes.filter(ee=> {
        if(ee.id==viaje.id){
          ee.actual=false;
          ee.fechaHoraRealLlegada=moment().format("DD/MM/YYYY HH:mm:ss");
          ee.retrasos=viaje.retrasos;
        }
        else if(ee.orden==viaje.orden+1) {
          ee.siguiente=true;
        }
      });
    });
  }

  timer() {

    //este calculo es para mostrar en la ventana del viaje actual
    this.tiempoEnSegs=this.tiempoEnSegs+1;
    var hours = Math.floor((this.tiempoEnSegs*1000 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((this.tiempoEnSegs*1000 % (1000 * 60 * 60)) / (1000 *60));
    var seconds = Math.floor(this.tiempoEnSegs*1000 % (1000 * 60) / 1000);

    this.setTiempoCrono(hours+"h "+minutes+"m "+seconds+"s");

    //este calculo es para mostrar en la ventana de retraso
    var tiempoDemoraViajeActualEnSegs = this.tiempoEnSegs - moment.duration(moment(this.getViajeActual().fechaHoraLlegadaEstipuladas)
    .diff(moment(this.getViajeActual().fechaHoraSalidaEstipuladas)))
    .asSeconds();
    var hoursTiempoDemora = Math.floor((tiempoDemoraViajeActualEnSegs*1000 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutesTiempoDemora = Math.floor((tiempoDemoraViajeActualEnSegs*1000 % (1000 * 60 * 60)) / (1000 *60));
    var secondsTiempoDemora = Math.floor(tiempoDemoraViajeActualEnSegs*1000 % (1000 * 60) / 1000);

    this.tiempoDemoraViajeActualEnHMS=hoursTiempoDemora+"h "+minutesTiempoDemora+"m "+secondsTiempoDemora+"s";
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