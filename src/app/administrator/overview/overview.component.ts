import { Component, OnInit, Input } from "@angular/core";
import { AdministratorService } from "src/app/core/services/administrator.service";
import { Recorrido } from "src/app/core/model/recorrido";

@Component({
  selector: "evince-overview",
  templateUrl: "./overview.component.html"
})
export class OverviewComponent implements OnInit {

  constructor(private iAdministratorService: AdministratorService) {}

  @Input() iCurrentListView: string='general-list';
  @Input() iCurrentChartView: string='general-chart';
  @Input() recorridoAAnalizarId: any;
  //private recorridoAAnalizar:any;
  private recorridoAAnalizar:any;
  private viajesAAnalizar:any;
  private retrasosAAnalizar:any;
  private iRecorridos:Array<any>;
  private recorrido:any;
  private showSubscribed:boolean=true;
  private origenes:Array<{}> = new Array<{}>();
  private destinos:Array<{}> = new Array<{}>();
  //private origenes = {};
  //private destinos = {};
  private origenSeleccionado:number;
  private destinoSeleccionado:number;

  updateRecorridoAAnalizar(recId) {
    this.iAdministratorService.RoutesClient.getById(recId).subscribe(recorrido => this.recorridoAAnalizar=recorrido);
  }
  
  updateViews(list,chart) {
    this.iCurrentListView=list;
    this.iCurrentChartView=chart;
  }

  updateViajesAAnalizar(viajes){
    this.viajesAAnalizar=viajes;
  }

  updateRetrasosAAnalizar(retrasos){
    this.retrasosAAnalizar=retrasos;
  }

  updateiCurrentListView(iCurrentListView){
    this.iCurrentListView=iCurrentListView;
  }

  updateiCurrentChartView(iCurrentChartView){
    this.iCurrentChartView=iCurrentChartView;
  }

  updateOrigenSeleccionado(origen) {
    this.origenSeleccionado=origen;
    this.iAdministratorService.RoutesClient
    .getByOrigenDestino(this.origenSeleccionado,this.destinoSeleccionado,this.showSubscribed)
    .subscribe(recorridos => this.iRecorridos=recorridos);
  }
  updateDestinoSeleccionado(destino) {
    this.destinoSeleccionado=destino;
    this.iAdministratorService.RoutesClient
    .getByOrigenDestino(this.origenSeleccionado,this.destinoSeleccionado,this.showSubscribed)
    .subscribe(recorridos => this.iRecorridos=recorridos);
  }

  updateOrigenes(){
    this.origenes=[];
     this.iRecorridos.forEach(element => {
      var agrega=true;
      this.origenes.forEach(orig=>{
        if(orig['origenId']==element.origenId){
          agrega=false;
        }
      });
      if(agrega){
        var origen={};
        origen['origenId']=element.origenId;
        origen['origenDesc']=element.origen;
        this.origenes.push(origen);
      }
    });
  }

  updateDestinos(){
    this.destinos=[];
    this.iRecorridos.forEach(element => {
      var agrega=true;
      this.destinos.forEach(dest=>{
        if(dest['destinoId']==element.destinoId){
          agrega=false;
        }
      });
      if(agrega){
        var destino={};
        destino['destinoId']=element.destinoId;
        destino['destinoDesc']=element.destino;
        this.destinos.push(destino);
      }
    });
  }
  //TODO: DEJAR EL VALOR DEL ORIGEN Y EL DESTINO EN EL SELECT

  updateSubscription(recorrido){
    var recorridoAActualizar=this.iRecorridos.filter(elem=>elem.id==recorrido.id)[0];
    recorridoAActualizar.subscription=recorrido.subscription;
    this.iAdministratorService.RoutesClient
    .subscription(recorridoAActualizar)
      .subscribe(() => this.iAdministratorService.RoutesClient
    .getByOrigenDestino(this.origenSeleccionado,this.destinoSeleccionado,this.showSubscribed)
      .subscribe(rec=>(this.iRecorridos=rec)));
  }

  updateShowSubscribed(event){
    this.showSubscribed ? 
      this.showSubscribed = false :
        this.showSubscribed=true;
    this.iAdministratorService.RoutesClient
    .getByOrigenDestino(this.origenSeleccionado,this.destinoSeleccionado,this.showSubscribed)
      .subscribe(rec=>{
        this.iRecorridos=rec;
        this.updateOrigenes();
        this.updateDestinos();
      });

  }

  ngOnInit() {
     this.iAdministratorService.RoutesClient.get(this.showSubscribed)
     .subscribe(
      recorridos => {
        this.iRecorridos = recorridos;
        this.updateOrigenes();
        this.updateDestinos();
      }
    )
  }
}
