import {
  Selector,
  State,
  Action,
  StateContext,
  NgxsAfterBootstrap
} from "@ngxs/store";
import { tap } from "rxjs/operators";
import { SettingsService } from "../services/settings.service";
import { LoadSettings } from "./settings.model";

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
