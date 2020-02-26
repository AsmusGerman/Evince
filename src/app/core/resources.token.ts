import { InjectionToken } from "@angular/core";
import { from, Observable } from "rxjs";
import { map, share } from "rxjs/operators";
import { environment } from 'src/environments/environment';

export const Resources = new InjectionToken<Observable<any>>(
  "RESOURCES",
  {
    factory: function() {
      return from(
        import(
          /* webpackInclude: /\.json$/ */
          /* webpackChunkName: "authentication-resources" */
          environment.resources
        )
      ).pipe(
        map(json => json.default),
        share()
      );
    }
  }
);
