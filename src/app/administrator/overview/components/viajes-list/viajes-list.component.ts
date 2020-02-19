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

    public iDisplayedColumns: string[] = ["id" , "cantPasajeros", "fechaHoraSalidaEstipuladas", "fechaHoraLlegadaEstipuladas", 
    "estado","terminalOrigen","terminalDestino","analyze"];
  
    constructor() {}
  
/*     updateViajesAAnalizar(viajes) {
        console.log("estoy en viaje-list los viajes a analizar es: ")
        console.log(viajes);
    } */

    ngOnInit() {
      console.log("estoy en viajes-list los viajes a analizar es: ")
      console.log(this.viajesAAnalizar);
    }
  
    ngOnChanges() {
      console.log("on changes viajeslist");
    }
  
    ngAfterViewInit() {

    }
  }
  