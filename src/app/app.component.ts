import { Component } from "@angular/core";
import { Actions, ofActionDispatched } from "@ngxs/store";
import { Router } from "@angular/router";
import { Logout } from "./authentication/store/authentication.model";

@Component({
  selector: "evince-root",
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(private actions: Actions, private router: Router) {}

  ngOnInit() {
    this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => {
      this.router.navigate(["/login"]);
    });
  }
}
