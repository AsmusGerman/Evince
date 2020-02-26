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
import template from "./travels-chart-compare.template";
import { FormGroup, FormControl } from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: "evince-travels-chart-compare",
  templateUrl: "./travels-chart-compare.component.html"
})
export class TravelsChartCompareComponent implements OnInit, AfterViewInit {
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

  changeFrecuencia(frecuencia) {}

  ngOnInit() {}

  ngOnChanges(frecuencia) {
    this.frecuenciaSeleccionada = frecuencia;
    this.viajesAAnalizar.sort(function(left, right) {
      left = moment(left.fechaHoraSalidaEstipuladas, "YYYY/MM/DD");
      right = moment(right.fechaHoraSalidaEstipuladas, "YYYY/MM/DD");
      return moment.utc(left).diff(moment.utc(right));
    });

    var periodos = [];
    var arraysPorcentajes = [];
    this.viajesAAnalizar.forEach(viaje => {
      var porcentaje = Number(((viaje.cantPasajeros * 100) / viaje.cantButacasColectivo).toFixed(2));
      var fecha = moment(viaje.fechaHoraSalidaEstipuladas, "YYYY/MM/DD");
      var periodo;
      if (frecuencia == "Mensual") {
        periodo = fecha.format("MMMM") + "\n" + fecha.format("YYYY");
      } else if (frecuencia == "Anual") {
        periodo = fecha.format("YYYY");
      }

      if (!periodos.includes(periodo)) {
        periodos.push(periodo);
        arraysPorcentajes.push([porcentaje]);

      } else {
        var indexPeriodos = periodos.findIndex(peri => peri == periodo);
        //var array=[];
        //array.push(porcentaje);
        //console.log("voy a insertar en el array ",array);
        arraysPorcentajes[indexPeriodos].push(
          (porcentaje)
          );
      }
    });

    for (var i = 0; i < arraysPorcentajes.length; i++) {
      var sum = 0;
      var subArray = arraysPorcentajes[i];
      subArray.forEach(valor => {
        sum += valor;
      });
      arraysPorcentajes[i] = (sum / subArray.length).toFixed(2);
    }
    template.series[0].data = arraysPorcentajes;
    template.series[1].data = arraysPorcentajes;
    template.yAxis.data = periodos;

    this.iChart.setOption(template, true);
  }

  ngAfterViewInit() {
    this.iChart = echarts.init(this.iChartContainer.nativeElement);
    this.iChart.setOption(template, true);
    this.iChart.resize({width: 600, height:1000});
    this.ngOnChanges("Mensual");
  }
}
