import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { AuthState } from "../store/authentication.state";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class LoginGuard implements CanActivate {
  constructor(private iStore: Store, private iRouter: Router) {}

  canActivate() {
    return this.iStore.select(AuthState.isAuthenticated).pipe(
      map(isAuthenticated => !!isAuthenticated),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          localStorage.clear();
          sessionStorage.clear();
          this.iRouter.navigate(["signin"]);
        }
      })
    );
  }
}
