import { Component, OnInit } from "@angular/core";
import { AdministratorService } from "src/app/core/services/administrator.service";
import { Recorrido } from "src/app/core/model/recorrido";

@Component({
  selector: "evince-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.scss"]
})
export class OverviewComponent implements OnInit {

  constructor(private iAdministratorService: AdministratorService) {}

  private iRecorridos:Array<any>;
  private recorrido:any;
  private showSubscribed:boolean=false;
  private origenes:Array<string> = new Array<string>();
  private destinos:Array<string> = new Array<string>();
  private origenSeleccionado:string;
  private destinoSeleccionado:string;

  updateOrigenSeleccionado(origen) {
    this.origenSeleccionado=origen;
    this.iAdministratorService.RoutesClient
    .getByOrigenDestino(this.origenSeleccionado,this.destinoSeleccionado)
    .subscribe(recorridos => this.iRecorridos=recorridos);
  }
  updateDestinoSeleccionado(destino) {
    this.destinoSeleccionado=destino;
    this.iAdministratorService.RoutesClient
    .getByOrigenDestino(this.origenSeleccionado,this.destinoSeleccionado)
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
    var recorridoAActualizar=this.iRecorridos.filter(elem=>elem.id==recorrido.id)[0];
    recorridoAActualizar.subscription=recorrido.subscription;
    this.iAdministratorService.RoutesClient
    .subscription(recorridoAActualizar)
      .subscribe(() => this.iAdministratorService.RoutesClient
    .get(this.showSubscribed)
      .subscribe(rec=>(this.iRecorridos=rec)));
  }

  updateShowSubscribed(event){
    console.log(event);
    this.showSubscribed ? 
      this.showSubscribed = false :
        this.showSubscribed=true;
    this.iAdministratorService.RoutesClient
    .get(this.showSubscribed)
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
