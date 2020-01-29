import { Injectable } from "@angular/core";
import { from } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable()
export class SettingsService {
  constructor() {}

  loadSettings() {
    return from(
      import(
        /* webpackInclude: /\.json$/ */
        /* webpackChunkName: "settings" */
        `src/assets/settings${environment.production ? "" : ".dev"}.json`
      )
    ).pipe(map(json => json.default));
  }
}
