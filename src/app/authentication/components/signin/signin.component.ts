import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Store } from "@ngxs/store";
import { Login } from "../../store/authentication.model";
import { Router } from "@angular/router";

@Component({
  selector: "evince-signin",
  templateUrl: "./signin.component.html"
})
export class SigninComponent implements OnInit {
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
}
