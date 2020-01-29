import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Store } from "@ngxs/store";
import { Login } from "../../store/authentication.model";
import { Router } from "@angular/router";
import { map, switchMap } from "rxjs/operators";

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
    if (this.form.valid) {
      this.store.dispatch(new Login(this.form.value));
    }
  }

  public register() {
    this.router.navigate(["/register"], { replaceUrl: true });
  }
}
