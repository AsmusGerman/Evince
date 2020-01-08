import { Injectable } from "@angular/core";
import { from } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SettingsService {
  constructor() {}

  loadSettings() {
    return from(import("src/assets/settings.json")).pipe(
      map(json => json.default)
    );
  }
}
