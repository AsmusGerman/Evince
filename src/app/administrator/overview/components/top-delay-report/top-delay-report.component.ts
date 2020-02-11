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
  private iChart: any;

  constructor(private filterService: FilterService) {}

  ngOnInit() {
    this.filterService.currentData.subscribe(data => this.iDataSource = data);
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
    template.yAxis[0].data=function(){
      var codes = [];
        this.iDataSource.filter(e=>e.subscription).forEach(codes.push(e.code));
      return codes;
    }
    for (var recorrido of Object.entries(this.iDataSource)) {
      console.log(recorrido[1].code); // "a 5", "b 7", "c 9"
  }
    template.series[0].data=cantRetrasosRecorridos;
    this.iChart.setOption(template,true);
  }
}
