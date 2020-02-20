import { Component, OnInit, Input } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "evince-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  
  @Input("user") iUser: string;
  public Avatar: string;

  constructor(private iRouter: Router) {}

  ngOnInit() {
    this.Avatar = this.avatarize(this.iUser || "A");
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
