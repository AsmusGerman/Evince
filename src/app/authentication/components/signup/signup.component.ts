import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  Store,
  Actions,
  ofActionSuccessful,
  ofActionErrored
} from "@ngxs/store";
import { Register } from "../../store/authentication.model";
import { Router } from "@angular/router";
import { switchMap, map } from "rxjs/operators";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Resources } from "src/app/core/resources.token";
import { Observable } from "rxjs";
import { SnackbarService } from "src/app/shared/notification/services/snackbar.service";

@Component({
  selector: "evince-signup",
  templateUrl: "./signup.component.html"
})
export class SignupComponent implements OnInit {
  public form: FormGroup;

  public roles: any[] = [
    {
      id: 1,
      name: "administrator"
    },
    {
      id: 2,
      name: "driver"
    }
  ];

  constructor(
    private store: Store,
    private router: Router,
    public iDialogReg: MatDialogRef<SignupComponent>,
    private iActions: Actions,
    @Inject(Resources) private iResources: Observable<any>,
    private iNotificationService: SnackbarService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      lastname: new FormControl("", [Validators.required]),
      role: new FormControl("", [Validators.required])
    });

    this.iActions
      .pipe(ofActionSuccessful(Register))
      .pipe(
        switchMap(() => this.iResources),
        map(resources => resources.signup.success)
      )
      .subscribe(message => {
        this.close();
        this.iNotificationService.success({
          message
        });
      });

    this.iActions
      .pipe(ofActionErrored(Register))
      .pipe(
        switchMap(() => this.iResources),
        map(resources => resources.signup.fail)
      )
      .subscribe(message => {
        this.iNotificationService.danger({
          message
        });
      });
  }

  public submit() {
    if (this.form.valid) {
      const { username, password, name, lastname, role } = this.form.value;
      this.store
        .dispatch(
          new Register({ username, password, name, lastname, role: role.id })
        )
        .subscribe();
    }
  }

  public close() {
    this.iDialogReg.close();
  }
}
