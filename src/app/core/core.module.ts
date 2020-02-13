import { NgModule } from "@angular/core";
import { SettingsService } from "./services/settings.service";
import { NgxsModule } from "@ngxs/store";
import { SettingsState } from "./store/settings/settings.state";
import { DriverService } from './services/driver.service';
import { AdministratorService } from './services/administrator.service';

@NgModule({
  declarations: [],
  imports: [NgxsModule.forFeature([SettingsState])],
  providers: [SettingsService, DriverService, AdministratorService]
})
export class CoreModule {}
