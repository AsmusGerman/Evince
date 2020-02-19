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
    @Output() viajesParaAnalizarEmitter = new EventEmitter<Array<any>>();

    public iDisplayedColumns: string[] = ["terminalOrigen","terminalDestino","estado","analyze"];
  
    constructor() {}

    getViajesAAnalizar(viaje) {
      //console.log("cambio icurrentlistview");
      this.iCurrentListViewEmitter.emit('viajes-list');
      //console.log("emitiendo los viajes ",
      //this.recorridoAAnalizar[0].viajes.filter(v=>v.orden==viaje.orden));
      this.viajesParaAnalizarEmitter
      .emit(this.recorridoAAnalizar[0].viajes.filter(v=>v.orden==viaje.orden));
    }

    ngOnInit() {

    }
  
    ngOnChanges() {
      var grupoViaje=[];
      var ordenViaje=[];
      for (var viaje of this.recorridoAAnalizar[0].viajes) {
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
  