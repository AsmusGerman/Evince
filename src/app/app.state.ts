import { State, NgxsAfterBootstrap, StateContext } from "@ngxs/store";
import { SettingsService } from "./core/services/settings.service";

@State<any | null>({
  name: "evince",
  defaults: null
})
export class AppState implements NgxsAfterBootstrap {
  constructor(private settingsService: SettingsService) {}

  ngxsAfterBootstrap(ctx: StateContext<any | null>) {
    ctx.setState(this.settingsService.loadSettings());
  }
}
