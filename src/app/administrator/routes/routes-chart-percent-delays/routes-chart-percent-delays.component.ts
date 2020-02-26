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
import template from "./routes-chart-percent-delays.template";

@Component({
  selector: "evince-routes-chart-percent-delays",
  templateUrl: "./routes-chart-percent-delays.component.html"
})
export class RoutesChartPercentDelaysComponent
  implements OnInit, AfterViewInit {
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

  updateCausasYCantidades() {
    var gruposViaje = [];
    var cantRetrasosDeCadaGrupo = [];
    var ordenViaje = [];
    for (var viaje of this.recorridoAAnalizar.viajes) {
      if (!ordenViaje.includes(viaje.orden)) {
        gruposViaje.push([viaje]);
        ordenViaje.push(viaje.orden);
      }
    }

    gruposViaje.forEach(grupoViaje => {
      var cantPerdidaRetrasosGrupoViaje = 0;
      var cantViajesConRetrasos = 0;
      var cantViajes = 0;
      this.recorridoAAnalizar.viajes.forEach(viajeElem => {
        if (grupoViaje[0].orden == viajeElem.orden) {
          cantViajes += 1;
          if (viajeElem.retrasos.length > 0) {
            //suma la cant de viajes con retrasos para un grupo viaje
            cantViajesConRetrasos += 1;
            viajeElem.retrasos.forEach(retraso => {
              //suma los tiempos perdidos de cada retraso para ese grupo viaje
              cantPerdidaRetrasosGrupoViaje += retraso.tiempo;
            });
          }
        }
      });
      grupoViaje[1] = cantViajesConRetrasos;
      grupoViaje[2] = cantViajes;
      grupoViaje[3] = cantPerdidaRetrasosGrupoViaje;
    });

    var dataNombreViajes = [];
    var dataCantViajesConRetrasos = [];
    var dataCantViajes = [];

    gruposViaje.forEach(elem => {
      dataNombreViajes.push(elem[0].nombreCorto);
      //dataCantViajesConRetrasos.push(elem[1]);
      var porcentaje;
      porcentaje = (elem[1] * 100) / elem[2];
      dataCantViajesConRetrasos.push(Math.floor(porcentaje * 100) / 100);
      dataCantViajes.push(Math.floor((100 - porcentaje) * 100) / 100);
    });

    //var data=['cat1yaxiiis', 'cat2yaxis'];
    template.series[0].data = dataCantViajesConRetrasos;
    template.series[1].data = dataCantViajes;
    template.yAxis.data = dataNombreViajes;
    this.iChart.setOption(template, true);
  }

  ngOnInit() {}

  ngOnChanges() {
    this.updateCausasYCantidades();
  }

  ngAfterViewInit() {
    this.iChart = echarts.init(this.iChartContainer.nativeElement);
    this.iChart.setOption(template, true);
    this.iChart.resize();
  }
}
