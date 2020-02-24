import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
    Input,
    EventEmitter,
    Output
  } from "@angular/core";

  
  @Component({
    selector: "evince-viajes-list",
    templateUrl: "./viajes-list.component.html",
    styleUrls: ["./viajes-list.component.scss"]
  })
  export class ViajesListComponent implements OnInit {

    @Input() viajesAAnalizar: any;
    private origen:string; 
    private destino:string;
    @Output() iCurrentListViewEmitter = new EventEmitter<string>();
    @Output() retrasosParaAnalizarEmitter = new EventEmitter<Array<any>>();
    public iDisplayedColumns: string[] = ["fechaHoraSalidaEstipulada","fechaHoraLlegadaEstipulada","cantPasajeros","cantButacasColectivo", "estado","retrasos"];
  
    constructor() {}

    retrasoAAnalizar(viaje) {
      this.iCurrentListViewEmitter.emit('retraso-list');
      this.retrasosParaAnalizarEmitter.emit(viaje.retrasos);
    }

    ngOnInit() {
    }
  
    ngOnChanges() {
      this.origen=this.viajesAAnalizar[0].trayecto.terminalOrigen; 
      this.destino=this.viajesAAnalizar[0].trayecto.terminalDestino;
    }
  
    ngAfterViewInit() {

    }
  }
  