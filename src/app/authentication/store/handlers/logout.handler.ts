import {
  Actions,
  ofActionSuccessful,
  Store,
  ofActionErrored
} from "@ngxs/store";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { GetRole, Logout } from "../authentication.model";

@Injectable()
export class LogoutHandler {
  constructor(
    private router: Router,
    private actions$: Actions,
    private store: Store
  ) {}

  public initialize() {
    // when LOGOUT action succeeds
    this.actions$.pipe(ofActionSuccessful(Logout)).subscribe({
      next: this.onSuccess.bind(this)
    });

    // when LOGOUT action fails
    this.actions$.pipe(ofActionErrored(Logout)).subscribe({
      next: this.onError.bind(this)
    });
  }

  private onSuccess() {
    //todo
  }

  private onError() {
    //todo
  }
}
