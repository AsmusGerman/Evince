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

  ngOnInit() {
    this.filterService.currentData.subscribe(data => this.iDataSource = data);
    this.filterService.codigosFiltro.subscribe(data => this.codigos = data);
    this.filterService.cantRetrasosPorCodigoFiltro.subscribe(data => this.cantRetrasosPorCodigo = data);
  }

  ngAfterViewInit() {
    var codeRecorridos=[];
    var cantRetrasosRecorridos=[];
/*     this.iDataSource.filter(e=>e.subscription).forEach(function(elem) {
      codeRecorridos.push(elem.code);
      cantRetrasosRecorridos.push(elem.cantRetrasos);
    }) */
    this.iChart = echarts.init(this.iChartContainer.nativeElement);
    //template.yAxis[0].data=['Recorrido4', 'Recorrido3', 'Recorrido2', 'Recorrido1'];
/*     template.yAxis[0].data=function() {
        this.iDataSource.filter(e=>e.subscription).get
    } */
    //template.yAxis[0].data=this.filterService.getCodigos();
    template.yAxis[0].data=this.codigos;
    //template.series[0].data=this.filterService.getCantRetrasos();
    template.series[0].data=this.cantRetrasosPorCodigo;
    this.iChart.setOption(template,true);
  }
}
