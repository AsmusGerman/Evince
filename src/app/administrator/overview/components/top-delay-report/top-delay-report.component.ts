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
      if (rec1.retrasos.length > rec2.retrasos.length) {
          return 1;
      }
  
      if (rec1.retrasos.length < rec2.retrasos.length) {
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
      for (var retrasos of recorrido[1].retrasos) {
        sum+=recorrido[1].retrasos.length;
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
