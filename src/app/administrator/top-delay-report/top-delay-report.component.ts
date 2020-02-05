import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import * as echarts from "echarts";
import template from "./top-delay-report.template";

@Component({
  selector: "evince-top-delay-report",
  templateUrl: "./top-delay-report.component.html",
  styleUrls: ["./top-delay-report.component.scss"]
})
export class TopDelayReportComponent implements OnInit, AfterViewInit {
  @ViewChild("chart", { static: true }) iChartContainer: ElementRef<
    HTMLDivElement
  >;

  private iChart: any;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.iChart = echarts.init(this.iChartContainer.nativeElement);
    this.iChart.setOption(template, true);
    this.iChart.resize({ width: 600, height: 800 });

    template.series[0].data = [
      { value: 10, name: "retraso 1" },
      { value: 5, name: "retraso 2" },
      { value: 15, name: "retraso 3" },
      { value: 25, name: "retraso 4" },
      { value: 20, name: "retraso 5" },
      { value: 35, name: "retraso 6" },
      { value: 30, name: "retraso 7" },
      { value: 40, name: "retraso 8" }
    ];
    // algun servicio que trae información para el reporte
    this.iChart.setOption(template, true);
  }
}
