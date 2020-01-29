import { Selector, State, StateContext, NgxsAfterBootstrap } from "@ngxs/store";
import { SettingsService } from "../../services/settings.service";
import { SettingsStateModel } from "./settings.model";

@State<SettingsStateModel | null>({
  name: "settings",
  defaults: {
    entrypoint: null
  }
})
export class SettingsState implements NgxsAfterBootstrap {
  constructor(private settingsService: SettingsService) {}

  ngxsAfterBootstrap(ctx: StateContext<SettingsStateModel>) {
    this.settingsService.loadSettings().subscribe(settings =>
      ctx.setState({
        entrypoint: settings.entrypoint
      })
    );
  }

  @Selector()
  static entrypoint(state: any): string | null {
    return state.entrypoint;
  }
}
