import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
    Input
  } from "@angular/core";
  import * as echarts from "echarts";
  import template from "./top-delay-causes-report.template";
  import { FilterService } from 'src/app/core/services/filter.service';
  
  @Component({
    selector: "evince-top-delay-causes-report",
    templateUrl: "./top-delay-causes-report.component.html",
    styleUrls: ["./top-delay-causes-report.component.scss"]
  })
  export class TopDelayCausesReportComponent implements OnInit, AfterViewInit {
    @ViewChild("chart", { static: true }) iChartContainer: ElementRef<
      HTMLDivElement
    >;
  
    //public iDataSource = Array<any>();
    //@Input('ELEMENT_DATA') iDataSource: Array<any>;
    @Input() iRecorridos: Array<any>;
    public codigos = Array<string>();
    public cantRetrasosPorCodigo = Array<number>();
    private iChart: any;
  
    constructor(private filterService: FilterService) {}
  
/*     sort() {
      this.iRecorridos.sort((rec1, rec2) => {
        if (rec1.retrasos.length > rec2.retrasos.length) {
            return 1;
        }
    
        if (rec1.retrasos.length < rec2.retrasos.length) {
            return -1;
        }
    
        return 0;
      });
    } */
  
    updateCausasYCantidades() {
      var causasYCantidades={};
      for (var recorrido of Object.entries(this.iRecorridos)) {
        for (var retraso of recorrido[1].retrasos) {
          if (Object.keys(causasYCantidades).includes(retraso.tipo)) {
            causasYCantidades[retraso.tipo]+=1;
          }
          else {
            causasYCantidades[retraso.tipo]=1;
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
  