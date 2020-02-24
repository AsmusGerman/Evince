import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
    Input,
    Output,
    EventEmitter
  } from "@angular/core";
  //import * as echarts from "echarts";
  //import template from "./top-delay-causes-report.template";
  //import { FilterService } from 'src/app/core/services/filter.service';
  
  @Component({
    selector: "evince-recorrido-list",
    templateUrl: "./recorrido-list.component.html",
    styleUrls: ["./recorrido-list.component.scss"]
  })
  export class RecorridoListComponent implements OnInit {

    @Input() recorridoAAnalizar: any;
    private viajesAgrupados: Array<any>;
    @Output() iCurrentListViewEmitter = new EventEmitter<string>();
    @Output() iCurrentChartViewEmitter = new EventEmitter<string>();
    @Output() viajesParaAnalizarEmitter = new EventEmitter<Array<any>>();

    public iDisplayedColumns: string[] = ["terminalOrigen","terminalDestino","estado","analyze"];
  
    constructor() {}

    getViajesAAnalizar(viaje) {
      this.iCurrentChartViewEmitter.emit('viajes-chart');
      this.iCurrentListViewEmitter.emit('viajes-list');
      this.viajesParaAnalizarEmitter
      .emit(this.recorridoAAnalizar.viajes.filter(v=>v.orden==viaje.orden));
    }

    ngOnInit() {

    }
  
    ngOnChanges() {
      var grupoViaje=[];
      var ordenViaje=[];
      for (var viaje of this.recorridoAAnalizar.viajes) {
        if (!ordenViaje.includes(viaje.orden)) {
          grupoViaje.push(viaje);
          ordenViaje.push(viaje.orden);
        }
      }
      this.viajesAgrupados=grupoViaje;
    }
  
    ngAfterViewInit() {

    }
  }
  