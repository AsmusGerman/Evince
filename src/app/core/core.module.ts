import { NgModule } from "@angular/core";
import { SettingsService } from "./services/settings.service";
import { NgxsModule } from "@ngxs/store";
import { SettingsState } from "./store/settings/settings.state";
import { DriverService } from "./services/driver.service";
import { AdministratorService } from "./services/administrator.service";
import { WeatherService } from "./services/weather.service";
import { GeolocationService } from "./services/geolocation.service";
import { HttpClientJsonpModule } from "@angular/common/http";
import { GeolocationState } from "./store/settings/geolocation.state";

@NgModule({
  declarations: [],
  imports: [
    HttpClientJsonpModule,
    NgxsModule.forFeature([SettingsState, GeolocationState])
  ],
  providers: [
    SettingsService,
    DriverService,
    AdministratorService,
    GeolocationService,
    WeatherService
  ]
})
export class CoreModule {}
