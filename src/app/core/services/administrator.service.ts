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
    console.log("estoy en el servicio get RoutesCliente, el _routesClient es");
    console.log(this._routesClient);
    console.log("estoy en el servicio get RoutesCliente, el ibaseadministratorapiurl es");
    console.log(this.iBaseAdministratorApiUrl);
    if (!this._routesClient) {
      this._routesClient = new RouteClient(
        this.iHttpClient,
        `${this.iBaseAdministratorApiUrl}/recorridos`
      );
    }
    return this._routesClient;
  }

  constructor(private iHttpClient: HttpClient, private iStore: Store) {
    console.log("estoy en el constructor de administratorservice, el entrypoint es");
    
    const entrypoint = this.iStore.selectSnapshot(SettingsState.entrypoint);
    console.log(entrypoint);
    this.iBaseAdministratorApiUrl = `${entrypoint}/administrator`;
  }
}

class RouteClient {
  constructor(private iHttpClient: HttpClient, private iUrl: string) {}

  get() {
    console.log("estoy en get");
    console.log(this.iUrl);
    return this.iHttpClient.get<Array<any>>(this.iUrl);
  }

  subscription(id: number, state: boolean) {
    return this.iHttpClient.post(`${this.iUrl}/subscription`, {
      id,
      state
    });
  }
}