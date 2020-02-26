import { InjectionToken } from "@angular/core";
import { from, Observable } from "rxjs";
import { map, share } from "rxjs/operators";

export const Resources = new InjectionToken<Observable<any>>(
  "RESOURCES",
  {
    factory: function() {
      return from(
        import(
          /* webpackInclude: /\.json$/ */
          /* webpackChunkName: "authentication-resources" */
          "src/assets/resources.json"
        )
      ).pipe(
        map(json => json.default),
        share()
      );
    }
  }
);
