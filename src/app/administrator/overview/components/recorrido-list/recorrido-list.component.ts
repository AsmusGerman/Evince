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
    selector: "evince-recorrido-list",
    templateUrl: "./recorrido-list.component.html",
    styleUrls: ["./recorrido-list.component.scss"]
  })
  export class RecorridoListComponent implements OnInit {

    @Input() recorridoAAnalizar: any;

    public iDisplayedColumns: string[] = ["id" , "cantPasajeros", "fechaHoraSalidaEstipuladas", "fechaHoraLlegadaEstipuladas", 
    "estado","terminalOrigen","terminalDestino","analyze"];
  
    constructor() {}
  
    recorridoParaAnalizar(recorrido) {
        console.log("estoy en recorrido-report, el recorrido a analizar es: ")
        console.log(recorrido);
    }

    getViajeAAnalizar(viaje) {
      console.log("el viaje a analizar es: ",viaje);
    }

    ngOnInit() {

    }
  
    ngOnChanges() {
      console.log("ESTOY EN RECORRIDO-REPORT, EL RECORRIDO A ANALIZAR ES ",this.recorridoAAnalizar[0].viajes);
    }
  
    ngAfterViewInit() {

    }
  }
  