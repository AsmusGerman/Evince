import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
    Input
  } from "@angular/core";
  //import * as echarts from "echarts";
  //import template from "./top-delay-causes-report.template";
  //import { FilterService } from 'src/app/core/services/filter.service';
  
  @Component({
    selector: "evince-viajes-list",
    templateUrl: "./viajes-list.component.html",
    styleUrls: ["./viajes-list.component.scss"]
  })
  export class ViajesListComponent implements OnInit {

    @Input() viajesAAnalizar: any;
    private origen:string; 
    private destino:string;

/*     public iDisplayedColumns: string[] = ["fechaHoraSalidaEstipulada","fechaHoraLlegadaEstipulada","cantPasajeros", "estado","retrasos"];
 */  
    constructor() {}
  
/*     updateViajesAAnalizar(viajes) {
        console.log("estoy en viaje-list los viajes a analizar es: ")
        console.log(viajes);
    } */

    verRetrasosViaje(viaje) {
      console.log(viaje);
    }

    ngOnInit() {
    }
  
    ngOnChanges() {
      console.log("origen, ");
      this.origen=this.viajesAAnalizar[0].trayecto.terminalOrigen; 
      console.log("destino, ");
      this.destino=this.viajesAAnalizar[0].trayecto.terminalDestino;
    }
  
    ngAfterViewInit() {

    }
  }
  