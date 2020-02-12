import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
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

  public iDataSource = Array<any>();
  public codigos = Array<string>();
  public cantRetrasosPorCodigo = Array<number>();
  private iChart: any;

  constructor(private filterService: FilterService) {}

  updateCodigos(data) {
    template.yAxis[0].data=data;
    this.iChart.setOption(template,true);
  }

  updateData(data) {
    template.series[0].data=data;
    this.iChart.setOption(template,true);
  }

  ngOnInit() {
    this.iChart = echarts.init(this.iChartContainer.nativeElement);
    this.filterService.currentData.subscribe(data => this.iDataSource = data);
    this.filterService.codigosFiltro.subscribe(data => this.updateCodigos(data));
    this.filterService.cantRetrasosPorCodigoFiltro.subscribe(data => this.updateData(data));
  }

  ngAfterViewInit() {
  }
}
