import { Selector, State, StateContext, NgxsAfterBootstrap } from "@ngxs/store";
import { SettingsService } from "../services/settings.service";

@State<any | null>({
  name: "settings",
  defaults: null
})
export class SettingsState implements NgxsAfterBootstrap {
  constructor(private settingsService: SettingsService) {}

  ngxsAfterBootstrap(ctx: StateContext<any | null>) {
    ctx.setState(this.settingsService.loadSettings());
  }

  @Selector()
  static entrypoint(state: any): string | null {
    return state.entrypoint;
  }
}
