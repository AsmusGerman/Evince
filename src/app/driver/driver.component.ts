import { Component, OnInit, Injector } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { DriverService } from "../core/services/driver.service";
import { Viaje } from "../core/model/viaje";
import { Recorrido } from "../core/model/recorrido";
import { NextTravel } from "./store/driver.model";
import { pipe } from "rxjs";
import { filter } from "rxjs/operators";

@Component({
  selector: "evince-driver",
  templateUrl: "./driver.component.html"
})
export class DriverComponent implements OnInit {
  public iTabs = [
    {
      label: "Principal",
      path: "./travels",
      hide: false,
      active: true
    },
    {
      label: "Recorridos",
      path: "./routes",
      hide: false,
      active: false
    },
    {
      label: "En curso",
      path: "./current",
      hide: true,
      active: false
    },
    {
      label: "Resumen",
      path: "./summary",
      hide: true,
      active: false
    }
  ];

  public iActiveRoute: string;

  constructor(
    private iRouter: Router,
    private iActivatedRoute: ActivatedRoute,
    private iStore: Store,
    private iDriverService: DriverService
  ) {}

  ngOnInit() {
    this.iStore.dispatch(new NextTravel());
    this.iRouter.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const route = this.iActivatedRoute.firstChild.routeConfig.path;
        this.updateNavigationTabs(route);
      });
  }

  public updateNavigationTabs(route: string) {
    this.iTabs.forEach(tab => {
      tab.active = route.split("/")[0] == tab.path.split("/")[1];
    });
  }
}
//styles: [
//  `
//    :host {
//      height: 100%;
//      display: flex;
//      flex-direction: column;
//    }
//
//    mat-tab-group {
//      flex: 1;
//      display: flex;
//    }
//
//    .mat-tab-body {
//      display: flex;
//    }
//
//    mat-tab-body-content {
//      flex: 1;
//    }
//
//    .mat-tab-body-wrapper {
//      flex: 1;
//    }
//
//    cdk-virtual-scroll-viewport {
//      height: 100%;
//      overflow-x: hidden;
//    }
//
//    mat-expansion-panel {
//      border-radius: none;
//      box-shadow: none;
//    }
//
//    .mat-expansion-panel-body {
//      padding: 1rem;
//    }
//
//    .mat-card {
//      margin: 0.5rem 0;
//      padding: 0.5rem;
//    }
//
//    .cdk-virtual-scroll-content-wrapper {
//      max-width: 100%;
//    }
//  `
//]
