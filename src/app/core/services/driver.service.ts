import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Store } from "@ngxs/store";
import { SettingsState } from "../store/settings/settings.state";
import { Recorrido } from "../model/recorrido";
import { Viaje } from "../model/viaje";

@Injectable()
export class DriverService {
  private iBaseDriverApiUrl: string;

  private _delayClient: DelayClient;
  public get DelayClient() {
    if (!this._delayClient) {
      this._delayClient = new DelayClient(
        this.iHttpClient,
        `${this.iBaseDriverApiUrl}/retrasos`
      );
    }
    return this._delayClient;
  }

  private _routesClient: RouteClient;
  public get RoutesClient() {
    if (!this._routesClient) {
      this._routesClient = new RouteClient(
        this.iHttpClient,
        `${this.iBaseDriverApiUrl}/recorridos`
      );
    }
    return this._routesClient;
  }

  private _travelClient: TravelClient;
  public get TravelClient() {
    if (!this._travelClient) {
      this._travelClient = new TravelClient(
        this.iHttpClient,
        `${this.iBaseDriverApiUrl}/viajes`
      );
    }
    return this._travelClient;
  }

  constructor(private iHttpClient: HttpClient, private iStore: Store) {
    const entrypoint = this.iStore.selectSnapshot(SettingsState.entrypoint);
    this.iBaseDriverApiUrl = `${entrypoint}/driver`;
  }
}

class DelayClient {
  constructor(private iHttpClient: HttpClient, private iUrl: string) {}

  push(body: {
    travel: string;
    type: string;
    timestamp: string;
    description: string;
  }) {
    if (!body.type || !body.timestamp) {
      throw new Error("los parámetros no pueden ser indefinidos");
    }

    return this.iHttpClient.post(this.iUrl, body);
  }

  get(travel: string) {
    const params = new HttpParams().append("travel", travel);
    this.iHttpClient.get(this.iUrl, { params });
  }

  types() {
    return this.iHttpClient.get<Array<string>>(`${this.iUrl}`);
  }
}

class RouteClient {
  constructor(private iHttpClient: HttpClient, private iUrl: string) {}

  get() {
    return this.iHttpClient.get<Array<Recorrido>>(this.iUrl);
  }
}

class TravelClient {
  constructor(private iHttpClient: HttpClient, private iUrl: string) {}

  stop(body: { travel: string }) {
    return this.iHttpClient.put(`${this.iUrl}/stop`, body);
  }

  start(body: { travel: string }) {
    return this.iHttpClient.put(`${this.iUrl}/start`, body);
  }

  get(travel: string) {
    const params = new HttpParams().append("travel", travel);
    return this.iHttpClient.get<Viaje>(`${this.iUrl}`, { params });
  }
}
