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
import template from "./travels-chart-compare.template";
import { FormGroup, FormControl } from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: "evince-travels-chart-compare",
  templateUrl: "./travels-chart-compare.component.html"
})
export class TravelsChartCompareComponent implements OnInit, OnChanges {
  @HostListener("window:resize", ["$event"])
  onResize() {
    this.iChart.resize();
  }
  @ViewChild("chart", { static: true }) iChartContainer: ElementRef<
    HTMLDivElement
  >;

  @Input() viajesAAnalizar: any;
  private iChart: any;
  public form: FormGroup;
  frecuenciaControl: FormControl;
  frecuenciaSeleccionada: string;

  constructor() {
    this.form = new FormGroup({
      frecuenciaControl: new FormControl()
    });
    moment.locale("es");
  }

  public frecuencias: Array<string> = new Array<string>("Mensual", "Anual");

  ngOnInit() {
    this.iChart = echarts.init(this.iChartContainer.nativeElement);
    this.iChart.setOption(template, true);
    this.iChart.resize();
    this.changeFrecuencia("Mensual");
  }

  ngOnChanges() {
    if (!!this.iChart) {
      this.changeFrecuencia("Mensual");
    }
  }

  changeFrecuencia(frecuencia) {
    this.frecuenciaSeleccionada = frecuencia;
    this.viajesAAnalizar.sort(function(left, right) {
      left = moment(left.fechaHoraSalidaEstipuladas, "YYYY/MM/DD");
      right = moment(right.fechaHoraSalidaEstipuladas, "YYYY/MM/DD");
      return moment.utc(left).diff(moment.utc(right));
    });

    var periodos = [];
    var arraysPorcentajes = [];
    this.viajesAAnalizar.forEach(viaje => {
      var porcentaje = (viaje.cantPasajeros * 100) / viaje.cantButacasColectivo;
      var fecha = moment(viaje.fechaHoraSalidaEstipuladas, "YYYY/MM/DD");
      var periodo;
      if (frecuencia == "Mensual") {
        periodo = fecha.format("MMMM") + "/" + fecha.format("YYYY");
      } else if (frecuencia == "Anual") {
        periodo = fecha.format("YYYY");
      }

      if (!periodos.includes(periodo)) {
        periodos.push(periodo);
        arraysPorcentajes.push([(Math.floor(porcentaje) * 100) / 100]);
      } else {
        var indexPeriodos = periodos.findIndex(peri => peri == periodo);
        arraysPorcentajes[indexPeriodos].push(
          (Math.floor(porcentaje) * 100) / 100
        );
      }
    });

    for (var i = 0; i < arraysPorcentajes.length; i++) {
      var sum = 0;
      var subArray = arraysPorcentajes[i];
      subArray.forEach(valor => {
        sum += valor;
      });
      arraysPorcentajes[i] = sum / subArray.length;
    }
    template.series[0].data = arraysPorcentajes;
    template.series[1].data = arraysPorcentajes;
    template.yAxis.data = periodos;

    this.iChart.setOption(template, true);
  }
}
