import { Selector, State, StateContext, NgxsAfterBootstrap } from "@ngxs/store";
import { GeolocationService } from "../../services/geolocation.service";

export interface GeolocationStateModel {
  lat: number;
  lon: number;
}

@State<GeolocationStateModel | null>({
  name: "geolocation",
  defaults: null
})
export class GeolocationState implements NgxsAfterBootstrap {
  constructor(private iGeolocationService: GeolocationService) {}

  ngxsAfterBootstrap(ctx: StateContext<GeolocationStateModel>) {
    this.iGeolocationService.locate(({ latitude, longitude }) => {
      ctx.patchState({
        lon: longitude,
        lat: latitude
      });
    });
  }
}
