import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Store } from "@ngxs/store";
import { SettingsState } from "../store/settings/settings.state";
import { Recorrido } from "../model/recorrido";
import { Viaje } from "../model/viaje";

@Injectable()
export class AdministratorService {
  private iBaseAdministratorApiUrl: string;

  private _routesClient: RouteClient;
  public get RoutesClient() {
    if (!this._routesClient) {
      this._routesClient = new RouteClient(
        this.iHttpClient,
        `${this.iBaseAdministratorApiUrl}/recorridos`
      );
    }
    return this._routesClient;
  }

  constructor(private iHttpClient: HttpClient, private iStore: Store) {
    const entrypoint = this.iStore.selectSnapshot(SettingsState.entrypoint);
    this.iBaseAdministratorApiUrl = `${entrypoint}/administrator`;
  }
}

class RouteClient {
  constructor(private iHttpClient: HttpClient, private iUrl: string) {}

  get(showSubscribed:boolean) {
    console.log("TRAER SOLO SUSCRITOS?");
    console.log(showSubscribed);
    if(!showSubscribed) {
      console.log("TRAIGO TODOS");
      //console.log(this.iHttpClient.get<Array<any>>(this.iUrl));
      return this.iHttpClient.get<Array<any>>(this.iUrl);
    }
    else {
      console.log("TRAIGO SOLO SUSCRITOS, LA URL ES");
      console.log(`${this.iUrl}/subscribed/`);
      //console.log(this.iHttpClient.get<Array<any>>(`${this.iUrl}/subscribed/`));
      return this.iHttpClient.get<Array<any>>(`${this.iUrl}/subscribed/`);
    }
  }

  getByOrigenDestino(origen:string,destino:string,showSubscribed:boolean) {
    console.log("getorigen",origen);
    console.log("getdestino",destino);
    var origenValido=origen!=null && origen!="";
    var destinoValido=destino!=null && destino!="";

    if(!origenValido && !destinoValido){
      console.log("NI UNO VALIDO");
      return this.get(showSubscribed);
    }
    else{
      console.log("obteniendo byorigenydestino");
      if(!showSubscribed) {
        console.log("showsubscribed es: ",showSubscribed);
        if(origenValido && !destinoValido){
          console.log("origen valido, destino no");
          return this.iHttpClient.get<Array<any>>(`${this.iUrl}/origen/`+origen);
        }
        else if (!origenValido && destinoValido){
          console.log("origen no valido, destino si");
          return this.iHttpClient.get<Array<any>>(`${this.iUrl}/destino/`+destino);
        }
        else if (origenValido && destinoValido){
          console.log("origen valido, destino tambien");
          return this.iHttpClient.get<Array<any>>(`${this.iUrl}/origenydestino/`+origen+'&'+destino);
        }
      }
      else {
        console.log("showsubscribed es: ",showSubscribed);
        if(origenValido && !destinoValido){
          console.log("origen valido, destino no");
          return this.iHttpClient.get<Array<any>>(`${this.iUrl}/origensubscribed/`+origen);
        }
        else if (!origenValido && destinoValido){
          console.log("origen no valido, destino si");
          return this.iHttpClient.get<Array<any>>(`${this.iUrl}/destinosubscribed/`+destino);
        }
        else if (origenValido && destinoValido){
          console.log("origen valido, destino tambien");
          return this.iHttpClient.get<Array<any>>(`${this.iUrl}/origenydestinosubscribed/`+origen+'&'+destino);
        }
      }
    }
  }
  
  subscription(rec) {
    return this.iHttpClient.put(`${this.iUrl}/update/`+rec.id, rec);
  }
}
