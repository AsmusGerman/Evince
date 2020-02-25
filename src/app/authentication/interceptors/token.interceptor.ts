import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";

import { Store } from "@ngxs/store";
import { AuthState } from "../store/authentication.state";
import { RefreshToken } from "../store/authentication.model";
import { SettingsState } from "src/app/core/store/settings/settings.state";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authorizationRequest = req;
    const token = this.store.selectSnapshot(AuthState.token);
    if (!!token) {
      const entrypoint = this.store.selectSnapshot(SettingsState.entrypoint);
      if (!req.url.includes(entrypoint)) {
        return next.handle(authorizationRequest);
      }

      // after null check, do expiration check
      const isExpired = false; //this.store.selectSnapshot(AuthState.isExpired);
      if (!!isExpired) {
        // refresh token
        //TODO: revisar si debería continuar desde aquí
        this.store.dispatch(new RefreshToken());
      } else {
        authorizationRequest = req.clone({
          headers: req.headers.set("Authorization", "Bearer " + token)
        });
      }
    }
    return next.handle(authorizationRequest);
  }
}
