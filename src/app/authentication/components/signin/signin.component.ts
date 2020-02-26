import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Store, Actions, ofActionSuccessful, ofActionErrored } from "@ngxs/store";
import { Login, Logout } from "../../store/authentication.model";
import { Router } from "@angular/router";
import { AuthState } from "../../store/authentication.state";
import { RolUsuario } from "src/app/core/model/rol-usuario";
import { Observable } from "rxjs";
import { SnackbarService } from "src/app/shared/notification/services/snackbar.service";
import { Resources } from "src/app/core/resources.token";
import { tap, switchMap, map } from "rxjs/operators";

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
    @Inject(Resources) private iResources: Observable<any>,
    private iNotificationService: SnackbarService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(""),
      password: new FormControl("")
    });

    this.iActions
      .pipe(ofActionSuccessful(Login))
      .pipe(
        switchMap(() => this.iResources),
        map(resources => resources.signin.success)
      )
      .subscribe(message => {
        this.navigate();
        this.iNotificationService.success({
          message
        });
      });

    this.iActions
      .pipe(ofActionErrored(Login))
      .pipe(
        switchMap(() => this.iResources),
        map(resources => resources.signin.fail)
      )
      .subscribe(message => {
        this.iNotificationService.danger({
          message
        });
      });
  }

  public submit() {
    if (this.form.valid) {
      this.iStore.dispatch(new Login(this.form.value));
    }
  }

  private navigate() {
    const routes = {
      [RolUsuario.administrator]: "administrator",
      [RolUsuario.chofer]: "driver",
      [RolUsuario.consultante]: "administrator"
    };

    const { username, role } = this.iStore.selectSnapshot(AuthState);
    this.iRouter.navigate([routes[role] || "signin"]);
  }
}
