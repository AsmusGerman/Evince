import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { AuthState } from "../store/authentication.state";
import { UserState } from "src/app/core/store/user.state";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate() {
    // if auth succeed
    const authenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
    if (!!authenticated) {
      // redirect corresponding to user profile
      const profile = this.store.selectSnapshot(UserState.profile);
      if (!!profile) {
        if (profile === "administrator")
          return this.router.parseUrl("/administrator");
        else return this.router.parseUrl("/driver");
      }
    }

    return false;
  }
}
