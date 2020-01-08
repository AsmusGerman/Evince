import { Component, OnInit, Injector } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "evince-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(private injector: Injector) {}

  ngOnInit() {}

  loginAsAdministrator() {
    this.injector
      .get(Router)
      .navigate(["/administrator"], { replaceUrl: true });
  }

  loginAsDriver() {
    this.injector.get(Router).navigate(["/driver"], { replaceUrl: true });
  }
}
