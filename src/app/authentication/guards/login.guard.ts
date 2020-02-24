import { Injectable, Inject } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { AuthState } from "../store/authentication.state";
import { SnackbarService } from "src/app/shared/notification/services/snackbar.service";
import { AuthenticationResources } from "../authentication-resources.token";
import { Observable } from "rxjs";
import { first, tap, map, take } from "rxjs/operators";
import { RolUsuario } from "src/app/core/model/rol-usuario";

@Injectable({
  providedIn: "root"
})
export class LoginGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate() {
    return this.store
      .select(AuthState.isAuthenticated)
      .pipe(map(isAuthenticated => !!isAuthenticated));
  }
}

/* 

    return role != undefined; */
