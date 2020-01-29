import { Injectable, Inject } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { AuthState } from "../store/authentication.state";
import { Roles } from "src/app/core/model/roles";
import { SnackbarService } from "src/app/shared/notification/services/snackbar.service";
import { AuthenticationResources } from "../authentication-resources.token";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class LoginGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router,
    @Inject(AuthenticationResources)
    private iAuthenticationResources: Observable<any>,
    private iSnackbarService: SnackbarService
  ) {}

  canActivate() {
    const isAuthenticated = this.store.selectSnapshot(
      AuthState.isAuthenticated
    );
    if (!!isAuthenticated) {
      // redirect corresponding to user roles
      const role = 2; //this.store.selectSnapshot(AuthState.role);
      switch (role) {
        case Roles.admin: {
          this.iAuthenticationResources
            .pipe(first())
            .subscribe(({ login }) =>
              this.iSnackbarService.success(login.success)
            );
          return this.router.parseUrl("/administrator");
        }
        case Roles.driver: {
          this.iAuthenticationResources
            .pipe(first())
            .subscribe(({ login }) =>
              this.iSnackbarService.success(login.success)
            );
          return this.router.parseUrl("/driver");
        }
      }
    }
    return false;
  }
}
