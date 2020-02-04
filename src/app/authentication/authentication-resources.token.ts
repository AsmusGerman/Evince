import { InjectionToken } from "@angular/core";
import { from, Observable} from "rxjs";
import { map, shareReplay } from "rxjs/operators";

export const AuthenticationResourcesToken = new InjectionToken<Observable<any>>(
  "AUTHENTICATION_RESOURCES",
  {
    factory: function() {
      return from(
        import(
          /* webpackInclude: /\.json$/ */
          /* webpackChunkName: "authentication-resources" */
          "./authentication.resources.json"
        )
      ).pipe(map(json => json.default), shareReplay(1));
    }
  }
);
