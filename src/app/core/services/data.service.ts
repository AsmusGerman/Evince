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
        "fechaHoraLlegadaEstipuladas" : "2020/03/13 18:00:15",
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
          "fechaHoraLlegadaEstipuladas" : "2020/03/13 22:00:00",
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
        "fechaHoraSalidaEstipuladas" : "2020/03/13 18:00",
        "fechaHoraLlegadaEstipuladas" : "2020/03/13 22:00",
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
  //tiempoCrono:string="";
  private tiempoCronoSubj = new Subject<any>();
  private viajeActualSubj = new Subject<any>();
  //private viajeActualSubj = new Subject<any>();
  tiempoCrono:string;
  viajeActual:Viaje;
  cronos:any;

  constructor(private recorridoService: RecorridoService) {}

  getTiempoCrono():string{
    return this.tiempoCrono;
  }

  setTiempoCrono(tc:string) {
    this.tiempoCrono=tc;
  }

/*   setTiempoCrono(tc: string) {
    this.tiempoCronoSubj.next({text:tc});
  }
  getTiempoCrono(): Observable<any> {
    return this.tiempoCronoSubj.asObservable();
  } */

  setViajeActual(va: Viaje) {
    this.viajeActual=va;
  }

  getViajeActual(): Viaje {
    return this.viajeActual;
  }

/*   setViajeActual(va: Viaje) {
    this.viajeActualSubj.next(va);
  }

  getViajeActual(): Observable<any> {
    return this.viajeActualSubj.asObservable();
  } */

  private dataSource = RECORRIDOS;
  //private dataSource=this.recorridoService.getRecorridos();

  //private viajeActual:Viaje=null;
  //private viajeSiguiente:Viaje=null;
  public tiempoUltimoViaje;


/*   getViajeActual() {
    this.dataSource.filter(e=>{
      e.viajes.filter(ee=> {
        if(ee.actual){
          return ee;
        }
      });
    });
    return null;
  } */

/*   getViajeSiguiente() {
    this.dataSource.filter(e=>{
      e.viajes.filter(ee=> {
        if(ee.siguiente){
          return ee;
        }
      });
    });
    return null;
  } */

/*   resetViajeActual() {
    this.viajeActual = new Viaje();
  } */

   getRecorridos() {
    return this.dataSource;
  }

/*   getTiempoCrono():string{
    console.log(this.tiempoCrono);
    return this.tiempoCrono;
  } */

  actualizarTiempo(){
    //setInterval(()=>{this.setTiempoCrono,1000});
    setInterval(()=>{this.tiempoCrono=this.getTiempoCrono()},1000);
  }

  comenzarViaje(viaje) {
    this.init();
    //this.tiempoCrono=this.getTiempoCrono();
    this.actualizarTiempo();
    //console.log(moment().format("DD/MM/YYYY HH:mm"));
    viaje.actual=true;
    viaje.siguiente=false;
    viaje.fechaHoraRealSalida=moment().format("YYYY/MM/DD HH:mm:ss");
    this.setViajeActual(viaje);
    //this.viajeActual=viaje;
     this.dataSource.filter(e=>{
      e.viajes.filter(ee=> {
       if(ee.orden==viaje.orden+1){
         ee.siguiente=true;
         //this.viajeSiguiente=ee;
        }
      });
     });
    //TODO: ENVIAR AL SERVER INFO DE CAMBIO DE ESTADO Y FECHAHORAREALSALIDA DE VIAJEACTUAL
    //TODO: ENVIAR AL SERVER INFO DE CAMBIO DE ESTADO DE VIAJESIGUIENTE
    }

  detenerViaje(viaje) {
    //this.tiempoUltimoViaje=this.tiempoCrono;
    this.stop();
    this.reset();
    this.setViajeActual(null);
    this.dataSource.filter(e=>{
      e.viajes.filter(ee=> {
        if(ee.id==viaje.id){
          ee.actual=false;
          //viajeFiltro.fechaHoraRealLlegada=this.tiempoUltimoViaje;
          ee.fechaHoraRealLlegada=moment().format("DD/MM/YYYY HH:mm:ss");
          ee.retrasos=viaje.retrasos;
        }
        else if(ee.orden==viaje.orden+1) {
          ee.siguiente=true;
        }
      });
    });
    console.log(this.getViajeActual());
  }

  timer() {
    this.tiempoEnSegs=this.tiempoEnSegs+1;
    var hours = Math.floor((this.tiempoEnSegs*1000 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((this.tiempoEnSegs*1000 % (1000 * 60 * 60)) / (1000 *60));
    var seconds = Math.floor(this.tiempoEnSegs*1000 % (1000 * 60) / 1000);
    
    this.setTiempoCrono(hours+"h "+minutes+"m "+seconds+"s");
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