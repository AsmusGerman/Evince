import { Component, OnInit, Input } from "@angular/core";
import { AdministratorService } from "src/app/core/services/administrator.service";
import { Recorrido } from "src/app/core/model/recorrido";

@Component({
  selector: "evince-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.scss"]
})
export class OverviewComponent implements OnInit {

  constructor(private iAdministratorService: AdministratorService) {}

  @Input() iCurrentListView: string='general-list';
  @Input() iCurrentChartView: string='general-chart';
  @Input() recorridoAAnalizarId: any;
  //private recorridoAAnalizar:any;
  private recorridoAAnalizar:any;
  private viajesAAnalizar:any;
  private iRecorridos:Array<any>;
  private recorrido:any;
  private showSubscribed:boolean=true;
  private origenes:Array<string> = new Array<string>();
  private destinos:Array<string> = new Array<string>();
  private origenSeleccionado:string;
  private destinoSeleccionado:string;

  updateRecorridoAAnalizar(recId) {
    this.iAdministratorService.RoutesClient.getById(recId).subscribe(recorrido => this.recorridoAAnalizar=recorrido);
    console.log("el recorrido a analizar es,",this.recorridoAAnalizar);
    //this.recorridoAAnalizar=rec;
  }
  
  updateViews(list,chart) {
    this.iCurrentListView=list;
    this.iCurrentChartView=chart;
  }

  updateViajesAAnalizar(viajes){
    this.viajesAAnalizar=viajes;
  }

  getRecorridoAAnalizar(rec) {
    //this.recorridoAAnalizar=rec;
  }

  updateiCurrentListView(iCurrentListView){
    this.iCurrentListView=iCurrentListView;
    console.log("actualizo icurrentrecview, ahora es ",iCurrentListView);
    console.log(iCurrentListView);
  }

  updateiCurrentChartView(iCurrentChartView){
    this.iCurrentChartView=iCurrentChartView;
    console.log("actualizo icurrentrecview, ahora es ",iCurrentChartView);
    console.log(iCurrentChartView);
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
    this.origenes = [];
     this.iRecorridos.forEach(element => {
      this.origenes.push(element.origen);
    });
    console.log("ORIGENES");
    console.log(this.origenes);
  }

  updateDestinos(){
    this.destinos = [];
    this.iRecorridos.forEach(element => {
     this.destinos.push(element.destino);
   });
 }

  updateSubscription(recorrido){
    console.log("haciendo update, origen seleccionado: ",this.origenSeleccionado);
    console.log("haciendo update, origen seleccionado: ",this.destinoSeleccionado);
    var recorridoAActualizar=this.iRecorridos.filter(elem=>elem.id==recorrido.id)[0];
    recorridoAActualizar.subscription=recorrido.subscription;
    this.iAdministratorService.RoutesClient
    .subscription(recorridoAActualizar)
      .subscribe(() => this.iAdministratorService.RoutesClient
    .getByOrigenDestino(this.origenSeleccionado,this.destinoSeleccionado,this.showSubscribed)
      .subscribe(rec=>(this.iRecorridos=rec)));
  }

  updateShowSubscribed(event){
    console.log(event);
    this.showSubscribed ? 
      this.showSubscribed = false :
        this.showSubscribed=true;
    this.iAdministratorService.RoutesClient
    .getByOrigenDestino(this.origenSeleccionado,this.destinoSeleccionado,this.showSubscribed)
      .subscribe(rec=>this.iRecorridos=rec);
  }

  ngOnInit() {
    console.log("showsubs vale " +this.showSubscribed);
     this.iAdministratorService.RoutesClient.get(this.showSubscribed)
     .subscribe(
      recorridos => {
        this.iRecorridos = recorridos;
        this.updateOrigenes();
        this.updateDestinos();
      }
    )
    
/*     this.iAdministratorService.RoutesClient.getSubscribed().subscribe(
      onlySubs => (this.showSubscribed = onlySubs)
    ); */
  }
}
