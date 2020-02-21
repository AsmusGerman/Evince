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
  
/*     tiempoPerdidoEnCadaTipoRetraso(orden,tiposRetrasos,gruposViaje) {
      gruposViaje. */

/*       var dataRetraso=[];
      tiposRetrasos.forEach(retraso=>{
        var cant=0;
        this.recorridoAAnalizar[0].viajes.filter(viajeFilter=>viajeFilter.orden==orden)
        .forEach(viaje=>{

          viaje.retrasos.forEach(retrasoViaje=>{
            if(retrasoViaje.tipo==retraso){
              cant+=retrasoViaje.tiempo;
            }
          });

        });
        dataRetraso.push(cant);
      });

      console.log(dataRetraso);
      return dataRetraso; */
    //}

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
        console.log("el orden es",viaje[0].orden);
        //console.log("tiempo perdido en cada tipo retraso");
        //this.tiempoPerdidoEnCadaTipoRetraso(viaje[0].orden,causasRetrasos);

      });

      causasRetrasos.forEach(causa=>{
        var serie = this.tiempoPerdidoEnCadaTipoRetraso(causa,gruposViaje);
      });
      
      this.tiempoPerdidoEnCadaTipoRetraso(viaje[0].orden,causasRetrasos,gruposViaje);

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
  