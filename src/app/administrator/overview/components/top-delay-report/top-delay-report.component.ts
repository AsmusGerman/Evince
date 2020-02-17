import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input
} from "@angular/core";
import * as echarts from "echarts";
import template from "./top-delay-report.template";
import { FilterService } from 'src/app/core/services/filter.service';

@Component({
  selector: "evince-top-delay-report",
  templateUrl: "./top-delay-report.component.html",
  styleUrls: ["./top-delay-report.component.scss"]
})
export class TopDelayReportComponent implements OnInit, AfterViewInit {
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

  sort() {
    console.log("en sort, los recorridos son", this.iRecorridos);
    this.iRecorridos.sort((rec1, rec2) => {
      console.log(rec1.viajes[0].retrasos);
      var cantRetRec1=0;
      var cantRetRec2=0;
      for(var viaje of rec1.viajes){
        for (var retraso of viaje.retrasos){
          cantRetRec1+=retraso.tiempo;
        }
      }
      for(var viaje of rec2.viajes){
        for (var retraso of viaje.retrasos){
          cantRetRec2+=retraso.tiempo;
        }
      }

      if (cantRetRec1 > cantRetRec2) {
          return 1;
      }
  
      if (cantRetRec1 < cantRetRec2) {
          return -1;
      }
  
      return 0;
    });
  }

  updateCodigosYCantRetrasos() {
    var codigos = [];
    var cantRetrasos = [];
    for (var recorrido of Object.entries(this.iRecorridos.filter(elem=>elem.subscription))) {
      codigos.push(recorrido[1].code);
      var sum=0;
      for (var viaje of recorrido[1].viajes) {
        for (var retraso of viaje.retrasos){
          sum+=retraso.tiempo;
        }
      }
      cantRetrasos.push(sum);
    }
    template.yAxis[0].data=codigos;
    template.series[0].data=cantRetrasos;
    this.iChart.setOption(template,true);
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log("enonchanges del primer reporte", this.iRecorridos);
    this.sort();
    this.updateCodigosYCantRetrasos();
  }

  ngAfterViewInit() {
    this.iChart = echarts.init(this.iChartContainer.nativeElement);
    this.iChart.setOption(template, true);
    this.iChart.resize({ width: 500, height: 500 });
  }
}
