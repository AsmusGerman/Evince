import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Store } from "@ngxs/store";
import { Login } from "../../store/authentication.model";
import { Router } from "@angular/router";
import { IconsService } from 'src/app/shared/material/services/icons.service';

@Component({
  selector: "evince-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(private store: Store, private router: Router, private iIconsService: IconsService) {
    
  }

  ngOnInit() {
    this.iIconsService.register("login", "assets/icons/key.svg");
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
