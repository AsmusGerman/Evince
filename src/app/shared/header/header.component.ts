import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { AuthState } from "src/app/authentication/store/authentication.state";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";

@Component({
  selector: "evince-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit {
  @Select(AuthState.username)
  public User$: Observable<string>;
  public Avatar: string;

  constructor(private iRouter: Router) {}

  ngOnInit() {
    this.User$.subscribe(username => {
      this.Avatar = this.avatarize(username);
    });
  }

  logout() {
    this.iRouter.navigate(["/logout"]);
  }

  private avatarize(value: string) {
    const name = value
      .split(" ")
      .reduce((initials, word) => (initials += word[0]), "")
      .toUpperCase();

    return name;
  }
}
