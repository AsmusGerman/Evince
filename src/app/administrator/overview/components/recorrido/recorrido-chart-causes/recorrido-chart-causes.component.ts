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
    @Input() iRecorridos: Array<any>;
    public codigos = Array<string>();
    public cantRetrasosPorCodigo = Array<number>();
    private iChart: any;
  
    constructor() {}
  
    updateCausasYCantidades() {
      var causasYCantidades={};
      for (var recorrido of Object.entries(this.iRecorridos.filter(elem=>elem.subscription))) {
        for (var retraso of recorrido[1].retrasos) {
          if (Object.keys(causasYCantidades).includes(retraso.tipo)) {
            causasYCantidades[retraso.tipo]+=retraso.tiempo;
          }
          else {
            causasYCantidades[retraso.tipo]=retraso.tiempo;
          }
        }
      }
      console.log("data");
      console.log(causasYCantidades);
      
      var fullData=[];
      for (const entrada of Object.entries(causasYCantidades)) {
        var cantidad:number=Number(entrada[1]);
        var causa:string=entrada[0];
        var data={value:cantidad, name:causa};
        fullData.push(data);
      }
      template.series[0].data=fullData;
      //template.series[0].data=data;
      
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
      this.iChart.setOption(template, true);
      this.iChart.resize({ width: 500, height: 500 });
    }
  }
  