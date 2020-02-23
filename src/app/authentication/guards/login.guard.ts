import { Injectable, Inject } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { AuthState } from "../store/authentication.state";
import { SnackbarService } from "src/app/shared/notification/services/snackbar.service";
import { AuthenticationResources } from "../authentication-resources.token";
import { Observable } from "rxjs";
import { first, tap } from "rxjs/operators";
import { RolUsuario } from 'src/app/core/model/rol-usuario';

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
      const role = this.store.selectSnapshot(AuthState.role);
      if(role != undefined) {
        // redirect corresponding to user roles
        switch (role) {
          case RolUsuario.chofer: {
            return this.router.parseUrl('driver');
          }
          default: {
            return this.router.parseUrl('administrator');
          }
        }
      }
    }
    return this.router.parseUrl('signin');
  }
}
