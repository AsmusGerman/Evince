import {
  Actions,
  ofActionSuccessful,
  Store,
  ofActionErrored
} from "@ngxs/store";
import { Injectable, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { Login, GetRole } from "../authentication.model";
import { SnackbarService } from "src/app/shared/notification/services/snackbar.service";
import { AuthenticationResources } from "../../authentication-resources.token";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";

@Injectable()
export class LoginHandler {
  constructor(
    private router: Router,
    private actions$: Actions,
    private store: Store,
    @Inject(AuthenticationResources)
    private iAuthenticationResources: Observable<any>,
    private iSnackbarService: SnackbarService
  ) {}

  public initialize() {
    // when LOGIN action succeeds
    this.actions$.pipe(ofActionSuccessful(Login)).subscribe({
      next: this.onSuccess.bind(this)
    });

    // when LOGIN action fails
    this.actions$.pipe(ofActionErrored(Login)).subscribe({
      next: this.onError.bind(this)
    });
  }

  private onSuccess() {
    debugger;
    //this.store.dispatch(new GetRole());
    this.iAuthenticationResources
      .pipe(first())
      .subscribe(({ login }) => this.iSnackbarService.success(login.success));
    this.router.navigate(["driver/"]);
  }

  private onError() {
    //todo
    this.iAuthenticationResources
      .pipe(first())
      .subscribe(({ login }) => this.iSnackbarService.error(login.fail));
  }
}
