import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
    Input
  } from "@angular/core";
  import * as echarts from "echarts";
  import template from "./recorrido-chart-causes.template";
  //import { FilterService } from 'src/app/core/services/filter.service';
  
  @Component({
    selector: "evince-recorrido-chart-causes",
    templateUrl: "./recorrido-chart-causes.component.html",
    styleUrls: ["./recorrido-chart-causes.component.scss"]
  })
  export class RecorridoChartCausesComponent implements OnInit, AfterViewInit {
    @ViewChild("chart", { static: true }) iChartContainer: ElementRef<
      HTMLDivElement
    >;
  
    //public iDataSource = Array<any>();
    //@Input('ELEMENT_DATA') iDataSource: Array<any>;
    @Input() recorridoAAnalizar: any;
    public codigos = Array<string>();
    public cantRetrasosPorCodigo = Array<number>();
    private iChart: any;
  
    constructor() {}
  
    updateCausasYCantidades() {
      var gruposViaje=[];
      var ordenViaje=[];
      for (var viaje of this.recorridoAAnalizar[0].viajes) {
        if (!ordenViaje.includes(viaje.orden)) {
          gruposViaje.push([viaje]);
          ordenViaje.push(viaje.orden);
        }
      }

/*      var gruposViaje=[]; 
        for (var viaje of this.recorridoAAnalizar[0].viajes) {
        var motivoRetraso;
        if (!.includes(viaje.orden)) {
          gruposViaje.push([viaje]);
          ordenViaje.push(viaje.orden);
        }
      } */

      var dataNombresViajes=[];
      gruposViaje.forEach(viaje=>dataNombresViajes.push(viaje[0].id));
      template.yAxis[0].data=dataNombresViajes;
      this.iChart.setOption(template,true);
    }
  
    ngOnInit() {
    }
  
    ngOnChanges() {
      //this.sort();
      this.updateCausasYCantidades();
    }
  
    ngAfterViewInit() {
      this.iChart = echarts.init(this.iChartContainer.nativeElement);
      this.iChart.resize({ width: 700, height: 500 });
    }
  }
  