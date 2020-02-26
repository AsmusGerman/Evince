import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
    Input,
    HostListener
  } from "@angular/core";
  import * as echarts from "echarts";
  import template from "./general-chart-top-causes.template";
  import { FilterService } from 'src/app/core/services/filter.service';
  
  @Component({
    selector: "evince-general-chart-top-causes",
    templateUrl: "./general-chart-top-causes.component.html"
  })
  export class GeneralChartTopCausesComponent implements OnInit, AfterViewInit {
    @HostListener("window:resize", ["$event"])
    onResize() {
      this.iChart.resize();
    }
    
    @ViewChild("chart", { static: true }) iChartContainer: ElementRef<
      HTMLDivElement
    >;
  
    @Input() iRecorridos: Array<any>;
    public codigos = Array<string>();
    public cantRetrasosPorCodigo = Array<number>();
    private iChart: any;
  
    constructor(private filterService: FilterService) {}
  
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
      
      var fullData=[];
      for (const entrada of Object.entries(causasYCantidades)) {
        var cantidad:number=Number(entrada[1]);
        var causa:string=entrada[0];
        var data={value:cantidad/60, name:causa};
        fullData.push(data);
      }
      template.series[0].data=fullData;
      
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
      this.iChart.resize();
    }
  }
  