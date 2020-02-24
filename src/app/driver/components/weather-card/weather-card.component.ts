import { Component, OnInit } from "@angular/core";
import { WeatherService } from "src/app/core/services/weather.service";
import { Observable } from "rxjs";
import { filter, switchMap, map, tap } from "rxjs/operators";

@Component({
  selector: "evince-weather-card",
  templateUrl: "./weather-card.component.html"
})
export class WeatherCardComponent implements OnInit {
  public iInformacionClimatica: Observable<any>;

  constructor(private iWeatherService: WeatherService) {}

  ngOnInit() {
    this.iInformacionClimatica = this.iWeatherService.location().pipe(
      switchMap(location => this.iWeatherService.weather(location)),
      map(([location, weather]) => {
        return {
          ciudad: location.LocalizedName,
          icono: this.iWeatherService.icon(weather.WeatherIcon),
          dia: weather.IsDayTime,
          clima: weather.WeatherText,
          humedad: `${weather.RelativeHumidity}%`,
          precipitacion: weather.HasPrecipitation,
          viento: `${weather.Wind.Speed.Metric.Value} km/h`,
          temperatura: `${weather.Temperature.Metric.Value} C°`,
          sensacion: `${weather.RealFeelTemperature.Metric.Value} C°`
        };
      })
    );
  }
}
