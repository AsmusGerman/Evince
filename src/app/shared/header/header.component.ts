import { Component, OnInit, Input } from "@angular/core";
import { Router } from '@angular/router';
import { AuthState } from 'src/app/authentication/store/authentication.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

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
    })
    
  }

  logout() {
    this.iRouter.navigate(["/logout"]);
  }

  private avatarize(value: string) {
    const name = value
      .split(" ")
      .reduce((initials, word) => (initials += word[0]), "")
      .toUpperCase();

    const canvas = document.createElement("canvas");
    canvas.style.display = "none";
    canvas.width = 32;
    canvas.height = 32;

    const context = canvas.getContext("2d");
    context.fillStyle = "transparent";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = "16px Arial";
    context.fillStyle = "#fff";

    context.fillText(name, name.length > 1 ? 3 : 10, 21.5);

    return canvas.toDataURL();
  }
}
