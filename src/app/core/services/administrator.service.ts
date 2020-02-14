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

  get(getSubscribed:boolean) {
    console.log("TRAER SOLO SUSCRITOS?");
    console.log(getSubscribed);
    if(!getSubscribed) {
      console.log("TRAIGO TODOS");
      console.log(this.iHttpClient.get<Array<any>>(this.iUrl));
      return this.iHttpClient.get<Array<any>>(this.iUrl);
    }
    else {
      console.log("TRAIGO SOLO SUSCRITOS, LA URL ES");
      console.log(`${this.iUrl}/subscribed/`);
      console.log(this.iHttpClient.get<Array<any>>(`${this.iUrl}/subscribed/`));
      return this.iHttpClient.get<Array<any>>(`${this.iUrl}/subscribed/`);
    }
  }


  subscription(rec) {
    return this.iHttpClient.put(`${this.iUrl}/update/`+rec.id, rec);
  }
}
