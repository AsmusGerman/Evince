import { Component, OnInit, ViewChild, Injector } from "@angular/core";
import { MatSidenav } from "@angular/material";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Router } from "@angular/router";

@Component({
  selector: "evince-administrator",
  templateUrl: "./administrator.component.html"
})
export class AdministratorComponent implements OnInit {
  public pages = [
    {
      label: "Principal",
      path: "./overview",
      icon: "layers"
    }
  ];

  constructor(private injector: Injector) {}

  ngOnInit() {}
}
