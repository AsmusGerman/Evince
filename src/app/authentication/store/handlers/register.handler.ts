import {
  Actions,
  ofActionSuccessful,
  Store,
  ofActionErrored
} from "@ngxs/store";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { GetRole, Register, Login } from "../authentication.model";
import { switchMap } from "rxjs/operators";

@Injectable()
export class RegisterHandler {
  constructor(
    private router: Router,
    private actions$: Actions,
    private store: Store
  ) {}

  public initialize() {
    // when REGISTER action succeeds
    this.actions$.pipe(ofActionSuccessful(Register)).subscribe({
      next: this.onSuccess.bind(this)
    });

    // when REGISTER action fails
    this.actions$.pipe(ofActionErrored(Register)).subscribe({
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
