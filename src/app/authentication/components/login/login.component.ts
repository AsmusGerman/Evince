import { Component, OnInit, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "evince-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(private injector: Injector) {}

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(""),
      password: new FormControl("")
    });
  }

  public submit() {
    if (this.form.valid) {
      //do submit
    }
  }

  /* loginAsAdministrator() {
    this.injector
      .get(Router)
      .navigate(["/administrator"], { replaceUrl: true });
  }

  loginAsDriver() {
    this.injector.get(Router).navigate(["/driver"], { replaceUrl: true });
  } */
}
