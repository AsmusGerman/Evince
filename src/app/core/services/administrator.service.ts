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
        `${this.iBaseAdministratorApiUrl}`
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

  getById(recorridoId:number) {
    return this.iHttpClient.get<Array<any>>(`${this.iUrl}/recorridos/`+recorridoId);
  }

  get(showSubscribed:boolean) {
    if(!showSubscribed) {
      return this.iHttpClient.get<Array<any>>(this.iUrl+'/recorridos/');
    }
    else {
      return this.iHttpClient.get<Array<any>>(`${this.iUrl}/recorridos/subscribed/`);
    }
  }

  getByOrigenDestino(origen:number,destino:number,showSubscribed:boolean) {
    var origenValido=origen!=null && origen!=0;
    var destinoValido=destino!=null && destino!=0;

    if(!origenValido && !destinoValido){
      return this.get(showSubscribed);
    }
    else{
      if(!showSubscribed) {
        if(origenValido && !destinoValido){
          return this.iHttpClient.get<Array<any>>(`${this.iUrl}/recorridos/origen/`+origen);
        }
        else if (!origenValido && destinoValido){
          return this.iHttpClient.get<Array<any>>(`${this.iUrl}/recorridos/destino/`+destino);
        }
        else if (origenValido && destinoValido){
          return this.iHttpClient.get<Array<any>>(`${this.iUrl}/recorridos/origenydestino/`+origen+'&'+destino);
        }
      }
      else {
        if(origenValido && !destinoValido){
          return this.iHttpClient.get<Array<any>>(`${this.iUrl}/recorridos/origensuscribed/`+origen);
        }
        else if (!origenValido && destinoValido){
          return this.iHttpClient.get<Array<any>>(`${this.iUrl}/recorridos/destinosuscribed/`+destino);
        }
        else if (origenValido && destinoValido){
          return this.iHttpClient.get<Array<any>>(`${this.iUrl}/recorridos/origenydestinosuscribed/`+origen+'&'+destino);
        }
      }
    }
  }
  
  subscription(rec) {
    //return this.iHttpClient.put(`${this.iUrl}/update/`+rec.id, rec);
    return this.iHttpClient.post(`${this.iUrl}/update/`+rec.id, rec);
  }
}
