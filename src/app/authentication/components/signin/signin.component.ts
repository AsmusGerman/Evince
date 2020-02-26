import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Store, Actions, ofActionSuccessful } from "@ngxs/store";
import { Login, Logout } from "../../store/authentication.model";
import { Router } from "@angular/router";
import { AuthState } from "../../store/authentication.state";
import { RolUsuario } from "src/app/core/model/rol-usuario";
import { tap, switchMap } from "rxjs/operators";
import { from } from "rxjs";
import { SnackbarService } from "src/app/shared/notification/services/snackbar.service";

@Component({
  selector: "evince-signin",
  templateUrl: "./signin.component.html"
})
export class SigninComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private iStore: Store,
    private iRouter: Router,
    private iActions: Actions,
    private iNotificationService: SnackbarService
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

      const { username, role } = this.iStore.selectSnapshot(AuthState);
      this.iRouter.navigate([routes[role] || "signin"]);
/* 
      const data = {
        title: "",
        message: `Bienvenido ${username}`,
        icon: ""
      };

      this.iNotificationService.success(data); */
    });
  }

  public submit() {
    if (this.form.valid) {
      this.iStore.dispatch(new Login(this.form.value));
    }
  }
}
