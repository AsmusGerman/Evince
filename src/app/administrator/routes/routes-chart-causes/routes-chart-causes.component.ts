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
import template from "./routes-chart-causes.template";

@Component({
  selector: "evince-routes-chart-causes",
  templateUrl: "./routes-chart-causes.component.html"
})
export class RoutesChartCausesComponent implements OnChanges, AfterViewInit {
  @HostListener("window:resize", ["$event"])
  onResize() {
    this.iChart.resize();
  }
  @ViewChild("chart", { static: true }) iChartContainer: ElementRef<
    HTMLDivElement
  >;

  @Input() recorridoAAnalizar: any;
  public codigos = Array<string>();
  public cantRetrasosPorCodigo = Array<number>();
  private iChart: any;

  constructor() {}

  ngAfterViewInit() {
    this.iChart = echarts.init(this.iChartContainer.nativeElement);
    this.iChart.setOption(template, true);
    this.iChart.resize();
    this.updateCausasYCantidades();
    if(!!this.recorridoAAnalizar) {
      this.updateCausasYCantidades();
    }
  }

  ngOnChanges() {
    if (!!this.iChart) {
      this.updateCausasYCantidades();
    }
  }

  tiempoPerdidoEnCadaTipoRetraso(causa, gruposViaje) {
    var dataRetraso = [];
    for (var viajeOrden of gruposViaje) {
      var cant = 0;
      this.recorridoAAnalizar.viajes
        .filter(viajeFilter => viajeFilter.orden == viajeOrden[0].orden)
        .forEach(viaje => {
          viaje.retrasos.forEach(retrasoViaje => {
            if (retrasoViaje.tipo == causa) {
              cant += retrasoViaje.tiempo;
            }
          });
        });
      dataRetraso.push(cant / 60);
    }
    return [causa, dataRetraso];
  }

  updateCausasYCantidades() {
    var gruposViaje = [];
    var ordenViaje = [];
    var causasRetrasos = [];
    for (var viaje of this.recorridoAAnalizar.viajes) {
      if (!ordenViaje.includes(viaje.orden)) {
        gruposViaje.push([viaje]);
        ordenViaje.push(viaje.orden);
      }
      viaje.retrasos.forEach(retraso => {
        if (!causasRetrasos.includes(retraso.tipo)) {
          causasRetrasos.push(retraso.tipo);
        }
      });
    }

    var dataNombresViajes = [];
    gruposViaje.forEach(viaje => {
      dataNombresViajes.push(viaje[0].nombreCorto);
    });

    var arraySeries = [];
    causasRetrasos.forEach(causa => {
      arraySeries.push(this.tiempoPerdidoEnCadaTipoRetraso(causa, gruposViaje));
    });
      var labelOption = {
        show: true,
        align: 'left',
         formatter: function(data) {
          var tooltipText="";
          var v = data;
          var decimalTime = v.value;
          decimalTime = decimalTime * 60 * 60;
          var hours = Math.floor((decimalTime / (60 * 60)));
          decimalTime = decimalTime - (hours * 60 * 60);
          var minutes = Math.floor((decimalTime / 60));
          tooltipText+=v.seriesName+': ';
          if(hours>0){
            tooltipText+=hours+' hs y ';
          }
          tooltipText+=minutes+' min';
          return tooltipText;
        },
        verticalAlign: 'middle',
        position: 'insideLeft',
        distance: 15,
        rich: {
            name: {
                textBorderColor: '#fff'
            }
        }
      
      };

    template["series"] = [];

    for (var i = 0; i < arraySeries.length; i++) {
      //series[i][0] nombre de la serie
      //series[i][1] array de data
      var serie = {
        name: arraySeries[i][0],
        data: arraySeries[i][1],
        label: labelOption,
        type: "bar"
      };
      template["series"].push(serie);
    }

    template.yAxis[0].data = dataNombresViajes;
    this.iChart.setOption(template, true);
  }
}
