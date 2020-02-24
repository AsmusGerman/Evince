import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Store, Actions, ofActionSuccessful } from "@ngxs/store";
import { Login, Logout } from "../../store/authentication.model";
import { Router } from "@angular/router";
import { AuthState } from "../../store/authentication.state";
import { RolUsuario } from "src/app/core/model/rol-usuario";
import { tap, switchMap } from "rxjs/operators";
import { from } from "rxjs";

@Component({
  selector: "evince-signin",
  templateUrl: "./signin.component.html"
})
export class SigninComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private iStore: Store,
    private iRouter: Router,
    private iActions: Actions
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(""),
      password: new FormControl("")
    });

    this.iActions.pipe(ofActionSuccessful(Login)).subscribe(() => {
      const routes = {
        [RolUsuario.administrator]: "administrator",
        [RolUsuario.chofer]: "driver",
        [RolUsuario.consultante]: "administrator"
      };

      const role = this.iStore.selectSnapshot(AuthState.role);
      this.iRouter.navigate([routes[role] || "signin"]);
    });
  }

  public submit() {
    if (this.form.valid) {
      this.iStore.dispatch(new Login(this.form.value));
    }
  }
}
