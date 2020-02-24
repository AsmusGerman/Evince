import { Selector, State, StateContext, NgxsAfterBootstrap } from "@ngxs/store";
import { SettingsService } from "../../services/settings.service";
import { IconsService } from "src/app/shared/material/services/icons.service";

@State<any | null>({
  name: "settings",
  defaults: null
})
export class SettingsState implements NgxsAfterBootstrap {
  constructor(
    private iSettingsService: SettingsService,
    private iIconsService: IconsService
  ) {}

  ngxsAfterBootstrap(ctx: StateContext<any>) {
    this.iSettingsService.loadSettings().subscribe(settings => {
      ctx.setState(settings);
      //this.iIconsService.load(settings.icons, "src/assets/iconss");
    });
  }

  @Selector()
  static entrypoint(state: any): string | null {
    return state.entrypoint;
  }
}
