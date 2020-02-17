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
    selector: "evince-recorrido-report",
    templateUrl: "./recorrido-report.component.html",
    styleUrls: ["./recorrido-report.component.scss"]
  })
  export class RecorridoReportComponent implements OnInit {

    @Input() recorridoAAnalizar: any;
  
    constructor() {}
  
    recorridoParaAnalizar(recorrido) {
        console.log("estoy en recorrido-report, el recorrido a analizar es: ")
        console.log(recorrido);
    }

    ngOnInit() {

    }
  
    ngOnChanges() {

    }
  
    ngAfterViewInit() {

    }
  }
  