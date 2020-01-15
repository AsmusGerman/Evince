import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Store } from "@ngxs/store";
import { Login } from "../../store/authentication.model";
import { Router } from "@angular/router";
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: "evince-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(""),
      password: new FormControl("")
    });
  }

  public submit() {
    debugger;
    if (this.form.valid) {
      this.store
        .dispatch(new Login(this.form.value))
        .pipe(
          // gets the logged user profile from the store
          switchMap(() => this.store.select(store => store.authentication.profile))
        )
        .subscribe((profile: string) => {
          alert(profile);
          /* if(profile == "driver") {
            this.loginAsDriver();
          } else {
            this.loginAsAdministrator();
          } */
        });
    }
  }

  public register() {
    this.router.navigate(["/register"], { replaceUrl: true });
  }

  private loginAsAdministrator() {
    this.router.navigate(["/administrator"], { replaceUrl: true });
  }

  private loginAsDriver() {
    this.router.navigate(["/driver"], { replaceUrl: true });
  }
}
