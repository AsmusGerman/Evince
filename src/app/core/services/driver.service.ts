import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Store } from "@ngxs/store";

import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

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
    time: string;
    description: string;
  }) {
    if (!body.time) {
      throw new Error("los parámetros no pueden ser indefinidos");
    }

    return this.iHttpClient.post(this.iUrl, body).pipe(catchError(handleError));
  }

  get(travel: string) {
    const params = new HttpParams().append("travel", travel);
    this.iHttpClient.get(this.iUrl, { params }).pipe(catchError(handleError));
  }

  types() {
    return this.iHttpClient
      .get<Array<string>>(`${this.iUrl}`)
      .pipe(catchError(handleError));
  }
}

class RouteClient {
  constructor(private iHttpClient: HttpClient, private iUrl: string) {}

  get() {
    return this.iHttpClient
      .get<Array<Recorrido>>(this.iUrl)
      .pipe(catchError(handleError));
  }
}

class TravelClient {
  constructor(private iHttpClient: HttpClient, private iUrl: string) {}

  stop(body: { travel: string }) {
    return this.iHttpClient
      .put(`${this.iUrl}/stop`, body)
      .pipe(catchError(handleError));
  }

  start(body: { travel: string }) {
    return this.iHttpClient
      .put(`${this.iUrl}/start`, body)
      .pipe(catchError(handleError));
  }

  get(travel: string) {
    const params = new HttpParams().append("travel", travel);
    return this.iHttpClient
      .get<Viaje>(`${this.iUrl}`, { params })
      .pipe(catchError(handleError));
  }
}

function handleError(err) {
  let errorMessage: string;
  if (typeof err === "string") {
    errorMessage = err;
  } else {
    if (!(err instanceof ErrorEvent)) {
      if (err.error && err.error.errors && err.error.errors.length) {
        errorMessage = err.error.errors[0];

        // TODO: mostrar snackbar de error
        console.error(errorMessage);
        // this.iSnackbarService.error({
        //   title: "Ha ocurrido un error",
        //   message: err.error.errors[0],
        //   icon: "error"
        // });
      }
    }
  }

  return throwError(errorMessage);
}
