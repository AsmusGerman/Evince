import { NgModule } from "@angular/core";
import { SettingsService } from "./services/settings.service";
import { NgxsModule } from "@ngxs/store";
import { SettingsState } from "./store/settings/settings.state";

@NgModule({
  declarations: [],
  imports: [NgxsModule.forFeature([SettingsState])],
  providers: [SettingsService]
})
export class CoreModule {}
