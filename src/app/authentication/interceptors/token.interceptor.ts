import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";

import { Store } from "@ngxs/store";
import { AuthState } from "../store/authentication.state";
import { RefreshToken } from '../store/authentication.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    debugger
    let authorizationRequest = req;
    const token = this.store.selectSnapshot(AuthState.token);
    if (!!token) {
      // after null check, do expiration check
      const isExpired = this.store.selectSnapshot(AuthState.isExpired);
      if (!!isExpired) {
        // refresh token
        //TODO: revisar
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
