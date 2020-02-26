import { Selector, State, StateContext, NgxsAfterBootstrap } from "@ngxs/store";
import { SettingsService } from "../../services/settings.service";

@State<any | null>({
  name: "settings",
  defaults: null
})
export class SettingsState implements NgxsAfterBootstrap {
  constructor(
    private iSettingsService: SettingsService
  ) {}

  ngxsAfterBootstrap(ctx: StateContext<any>) {
    this.iSettingsService.loadSettings().subscribe(settings => {
      ctx.setState(settings);
    });
  }

  @Selector()
  static entrypoint(state: any): string | null {
    return state.entrypoint;
  }
}
