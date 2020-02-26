import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { SignupComponent } from "../authentication/components/signup/signup.component";

@Component({
  selector: "evince-administrator",
  templateUrl: "./administrator.component.html"
})
export class AdministratorComponent implements OnInit {
  constructor(public iMatDialog: MatDialog) {}

  ngOnInit() {}

  signup() {
    this.iMatDialog.open(SignupComponent, {
      width: "50vw"
    });
  }
}
