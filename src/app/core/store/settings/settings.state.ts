import { Selector, State, StateContext, NgxsAfterBootstrap } from "@ngxs/store";
import { SettingsService } from '../../services/settings.service';

@State<any | null>({
  name: "settings",
  defaults: null
})
export class SettingsState implements NgxsAfterBootstrap {
  constructor(private settingsService: SettingsService) {}

  ngxsAfterBootstrap(ctx: StateContext<any>) {
    this.settingsService.loadSettings().subscribe(settings =>
      ctx.setState(settings)
    );
  }

  @Selector()
  static entrypoint(state: any): string | null {
    return "http://evince-web.azurewebsites.net/api/v1";
    //return state.entrypoint;
  }
}
