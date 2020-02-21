import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Store } from "@ngxs/store";
import { Register } from "../../store/authentication.model";
import { Router } from "@angular/router";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "evince-signup",
  templateUrl: "./signup.component.html"
})
export class SignupComponent implements OnInit {
  public form: FormGroup;

  roles: any[] = [
    {
      id: 1,
      name: "administrator"
    },
    {
      id: 2,
      name: "driver"
    }
  ];

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(""),
      password: new FormControl(""),
      name: new FormControl(""),
      lastname: new FormControl(""),
      role: new FormControl("")
    });
  }

  public submit() {
    if (this.form.valid) {
      this.store
        .dispatch(new Register(this.form.value))
        .pipe(
          // return the response
          switchMap(() =>
            this.store.select(store => store.authentication.registered)
          )
        )
        .subscribe((registered: boolean) => {
          alert(registered ? "user registered" : "failed");
          /* if(profile == "driver") {
            this.loginAsDriver();
          } else {
            this.loginAsAdministrator();
          } */
        });
    }
  }

  private loginAsAdministrator() {
    this.router.navigate(["/administrator"], { replaceUrl: true });
  }

  private loginAsDriver() {
    this.router.navigate(["/driver"], { replaceUrl: true });
  }
}
