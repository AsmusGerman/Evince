import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  HostListener,
  OnChanges
} from "@angular/core";
import * as echarts from "echarts";
import template from "./general-chart-top-delays.template";

@Component({
  selector: "evince-general-chart-top-delays",
  templateUrl: "./general-chart-top-delays.component.html"
})
export class GeneralChartTopDelaysComponent implements OnInit, OnChanges {
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

  constructor() {}

  ngOnInit() {
    this.iChart = echarts.init(this.iChartContainer.nativeElement);
    this.iChart.setOption(template, true);
    this.iChart.resize();
  }

  ngOnChanges() {
    if (!!this.iChart) {
      this.sort();
      this.updateCodigosYCantRetrasos();
    }
  }

  sort() {
    this.iRecorridos.sort((rec1, rec2) => {
      var cantRetRec1 = 0;
      var cantRetRec2 = 0;
      for (var retraso of rec1.retrasos) {
        cantRetRec1 += retraso.tiempo;
      }

      for (var retraso of rec2.retrasos) {
        cantRetRec2 += retraso.tiempo;
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
    for (var recorrido of Object.entries(
      this.iRecorridos.filter(elem => elem.subscription)
    )) {
      codigos.push(recorrido[1].code);
      var sum = 0;
      for (var retraso of recorrido[1].retrasos) {
        sum += retraso.tiempo;
      }
      sum = sum / 60;
      cantRetrasos.push(sum);
    }
    template.yAxis[0].data = codigos;
    template.series[0].data = cantRetrasos;
    this.iChart.setOption(template, true);
  }
}
