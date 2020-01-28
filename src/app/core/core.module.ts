import { NgModule } from "@angular/core";
import { UserService } from "./services/user.service";
import { SettingsService } from "./services/settings.service";
import { NgxsModule } from "@ngxs/store";
import { SettingsState } from "./store/settings.state";

@NgModule({
  declarations: [],
  providers: [UserService],
})
export class CoreModule {}
