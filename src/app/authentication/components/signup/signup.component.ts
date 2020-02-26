import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Store } from "@ngxs/store";
import { Register } from "../../store/authentication.model";
import { Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

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
    public iDialogReg: MatDialogRef<SignupComponent>
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      lastname: new FormControl("", [Validators.required]),
      role: new FormControl("", [Validators.required])
    });
  }

  public submit() {
    if (this.form.valid) {
      const { username, password, name, lastname, role } = this.form.value;
      this.store
        .dispatch(
          new Register({ username, password, name, lastname, role: role.id })
        )
        .pipe(
          // return the response
          switchMap(() =>
            this.store.select(store => store.authentication.registered)
          )
        )
        .subscribe(registered => {
          console.log(`usuario ${!!registered ? "" : "no"} registrado`);
          this.close();
        });
    }
  }

  public close() {
    this.iDialogReg.close();
  }
}
