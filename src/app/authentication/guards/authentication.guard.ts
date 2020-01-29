import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { AuthState } from "../store/authentication.state";

@Injectable({
  providedIn: "root"
})
export class AuthenticationGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate() {
    return this.store.selectSnapshot(AuthState.isAuthenticated);
  }
}
