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
  
    @Input() recorridoAAnalizar: any;
    public codigos = Array<string>();
    public cantRetrasosPorCodigo = Array<number>();
    private iChart: any;
  
    constructor() {}
  
    tiempoPerdidoEnCadaTipoRetraso(causa,gruposViaje) {
      var dataRetraso=[];
      for (var viajeOrden of gruposViaje){
      var cant=0;
      this.recorridoAAnalizar[0].viajes.filter(viajeFilter=>viajeFilter.orden==viajeOrden[0].orden)
      .forEach(viaje=>{
        viaje.retrasos.forEach(retrasoViaje=>{
          if(retrasoViaje.tipo==causa){
            cant+=retrasoViaje.tiempo;
          }
        });
      });
      dataRetraso.push(cant);
      }
      return [causa,dataRetraso];
    }

    updateCausasYCantidades() {
      var gruposViaje=[];
      var ordenViaje=[];
      var causasRetrasos=[];
      for (var viaje of this.recorridoAAnalizar[0].viajes) {
        if (!ordenViaje.includes(viaje.orden)) {
          gruposViaje.push([viaje]);
          ordenViaje.push(viaje.orden);
        }
        viaje.retrasos.forEach(retraso => {
          if (!causasRetrasos.includes(retraso.tipo)) {
            causasRetrasos.push(retraso.tipo);
          }
        });
      }

      var dataNombresViajes=[];
      gruposViaje.forEach(viaje=>{
        dataNombresViajes.push(viaje[0].id);
      });

      var series=[];
       causasRetrasos.forEach(causa=>{
         series.push(this.tiempoPerdidoEnCadaTipoRetraso(causa,gruposViaje));
      });

      for(var i=0; i<series.length; i++){
        //series[i][0] nombre de la serie
        //series[i][1] array de data
        template.series[i].name=series[i][0];
        template.series[i].data=series[i][1];
      }
      template.yAxis[0].data=dataNombresViajes;
      this.iChart.setOption(template,true);
    }
  
    ngOnInit() {
    }
  
    ngOnChanges() {
      this.updateCausasYCantidades();
    }
  
    ngAfterViewInit() {
      this.iChart = echarts.init(this.iChartContainer.nativeElement);
      this.iChart.resize({ width: 700, height: 500 });
    }
  }
  