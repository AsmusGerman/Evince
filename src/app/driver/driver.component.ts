import { Component, OnInit, Injector } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Router, ActivatedRoute } from "@angular/router";
import { DriverService } from "../core/services/driver.service";
import { Viaje } from "../core/model/viaje";
import { Recorrido } from "../core/model/recorrido";
import { NextTravel } from "./store/driver.model";

@Component({
  selector: "evince-driver",
  templateUrl: "./driver.component.html"
})
export class DriverComponent implements OnInit {
  public iRecorridos: Array<Recorrido> = [];
  public iViajes: Array<Viaje> = [];

  public iRecorrido: Recorrido | null;
  public iViajeActual: Viaje | null;
  public iViajeSiguiente: Viaje | null;

  public iTabs = {
    principal: {
      label: "Principal",
      path: "['/driver/home', { outlets: { driver: ['travels'] } }]"
    },
    recorridos: {
      label: "Recorridos",
      path: "['/driver', { outlets: { driver: ['routes'] } }]"
    },
    en_curso: {
      label: "En curso",
      path: "['/driver', { outlets: { driver: ['current'] } }]"
    },
    resumen: {
      label: "Resumen",
      path: "['/driver', { outlets: { driver: ['summary', iViajeId] } }]"
    }
  };

  constructor(
    private iRoute: ActivatedRoute,
    private iStore: Store,
    private iDriverService: DriverService
  ) {}

  ngOnInit() {
    this.iStore.dispatch(new NextTravel());
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
