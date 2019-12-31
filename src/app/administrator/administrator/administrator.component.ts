import { Component, OnInit, ViewChild, Injector } from "@angular/core";
import { MatSidenav } from "@angular/material";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Router } from "@angular/router";

@Component({
  selector: "evince-administrator",
  templateUrl: "./administrator.component.html",
  styleUrls: ["./administrator.component.scss"]
})
export class AdministratorComponent implements OnInit {
  iMatchesHand = this.injector
    .get(BreakpointObserver)
    .observe(Breakpoints.Handset);

  iCurrentView: string;

  constructor(private injector: Injector) {}

  ngOnInit() {

  }
}
