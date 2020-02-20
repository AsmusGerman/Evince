import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
    Input
  } from "@angular/core";
  import * as echarts from "echarts";
  import template from "./recorrido-chart-percent-delays.template";
  //import { FilterService } from 'src/app/core/services/filter.service';
  
  @Component({
    selector: "evince-recorrido-chart-percent-delays",
    templateUrl: "./recorrido-chart-percent-delays.component.html",
    styleUrls: ["./recorrido-chart-percent-delays.component.scss"]
  })
  export class RecorridoChartPercentDelaysComponent implements OnInit, AfterViewInit {
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
        var cantRetrasosDeCadaGrupo=[];
        var ordenViaje=[];
        for (var viaje of this.recorridoAAnalizar[0].viajes) {
          if (!ordenViaje.includes(viaje.orden)) {
            var grupoViaje=[];
            gruposViaje.push([viaje]);
            ordenViaje.push(viaje.orden);
          }
          //cantRetrasosDeCadaGrupo.push
        }
        console.log("gruposViaje vale",gruposViaje);

        gruposViaje.forEach(grupoViaje=>{
            console.log("grupoViaje");
            console.log(grupoViaje[0]);
            this.recorridoAAnalizar[0].viajes.forEach(viajeElem => {
                console.log("viaje del recorrido");
                console.log(viajeElem);
                if(grupoViaje[0].orden==viajeElem.orden){
                    console.log("match ",viajeElem.orden);
                    console.log("sumo ",viajeElem.retrasos.length," retrasos")
                    //TODO: SUMAR ACÁ LOS RETRASOS PARA CADA GRUPOVIAJE
                }
            })
        })

/*         this.recorridoAAnalizar[0].viajes.forEach(viajeElem => {
            for (var grupoViaje of gruposViaje) {
                if(viajeElem.orden==grupoViaje[0].orden){
                    console.log(viajeElem.retrasos.length);
                }
            }
        }); */


        var data=[]
        gruposViaje.forEach(elem=>data.push(elem.id));

        console.log("estoy en recorrido, el recorrido a analizar percentaje es, ",this.recorridoAAnalizar[0]);
        //var data=['cat1yaxiiis', 'cat2yaxis'];
        template.yAxis.data=data;
        console.log("template",template);
        this.iChart.setOption(template,true);
    }
  
    ngOnInit() {
    }
  
    ngOnChanges() {
      this.updateCausasYCantidades();
    }
  
    ngAfterViewInit() {
      this.iChart = echarts.init(this.iChartContainer.nativeElement);
      this.iChart.resize({ width: 500, height: 500 });
    }
  }
  