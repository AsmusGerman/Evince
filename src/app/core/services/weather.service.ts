import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { SettingsState } from "../store/settings/settings.state";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { empty } from "rxjs";
import { GeolocationState } from "../store/settings/geolocation.state";
import { map, tap, mapTo } from "rxjs/operators";

@Injectable()
export class WeatherService {
  constructor(private iStore: Store, private iHttpClient: HttpClient) {}

  location() {
    const { lat, lon } = this.iStore.selectSnapshot(GeolocationState);
    // se obtiene la configuracion de la api del clima
    const { weather } = this.iStore.selectSnapshot(SettingsState);
    if (!weather) return empty();
    // se obtienen los datos de la api del clima
    const { entrypoint, key } = weather;
    if (!entrypoint || !key) return empty();

    const params = new HttpParams()
      .append("q", `${lat},${lon}`)
      .append("apikey", key)
      .append("language", "es-ar");

      const headers = new HttpHeaders().append("Access-Control-Allow-Origin", "*")

    return this.iHttpClient.get(
      `${entrypoint}/locations/v1/cities/geoposition/search`,
      { params }
    );
  }

  weather(location: any) {
    // se obtiene la configuracion de la api del clima
    const api = this.iStore.selectSnapshot(SettingsState).weather;
    if (!api) return empty();
    // se obtienen los datos de la api del clima
    const { entrypoint, key } = api;
    if (!entrypoint || !key) return empty();

    const locationKey = location.Key;

    const params = new HttpParams()
      .append("apikey", key)
      .append("details", "true")
      .append("language", "es-ar");

    return this.iHttpClient
      .get(`${entrypoint}/currentconditions/v1/${locationKey}`, {
        params
      })
      .pipe(map(weather => [location, weather[0]]));
  }

  public icon(code: number) {
    const icons = {
      6: "sun",
      11: "cloud",
      14: "rainy",
      17: "storm",
      18: "rainy",
      32: "snowy",
      37: "night",
      38: "cloud",
      40: "rainy",
      42: "storm",
      44: "snowy"
    };

    for (const key in icons) {
      if (Number(key) <= code) {
        return icons[key];
      }
    }

    // sino siempre es soleado
    return icons[1];
  }
}
