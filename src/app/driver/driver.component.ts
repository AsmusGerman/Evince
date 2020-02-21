import { Component, OnInit, Injector } from "@angular/core";
import { Select } from "@ngxs/store";
import { Router } from "@angular/router";
import { DriverService } from "../core/services/driver.service";
import { Viaje } from "../core/model/viaje";
import { Recorrido } from "../core/model/recorrido";
import { tap } from "rxjs/operators";

@Component({
  selector: "evince-driver",
  templateUrl: "./driver.component.html",
  styles: [
    `
      :host {
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      mat-tab-group {
        flex: 1;
        display: flex;
      }

      .mat-tab-body {
        display: flex;
      }

      mat-tab-body-content {
        flex: 1;
      }

      .mat-tab-body-wrapper {
        flex: 1;
      }

      cdk-virtual-scroll-viewport {
        height: 100%;
        overflow-x: hidden;
      }

      mat-expansion-panel {
        border-radius: none;
        box-shadow: none;
      }

      .mat-expansion-panel-body {
        padding: 1rem;
      }

      .mat-card {
        margin: 0.5rem 0;
        padding: 0.5rem;
      }

      .cdk-virtual-scroll-content-wrapper {
        max-width: 100%;
      }
    `
  ]
})
export class DriverComponent implements OnInit {
  // @Select() // agregar estadod el usuario logeado
  public iUser;

  public iRecorridos: Array<Recorrido> = [];
  public iViajes: Array<Viaje> = [];

  public iRecorrido: Recorrido | null;
  public iViajeActual: Viaje | null;
  public iViajeSiguiente: Viaje | null;

  public iNavLinks = [
    {
      label: "Principal",
      path: "/driver/home"
    },
    {
      label: "Recorridos",
      path: "['/driver', { outlets: { driver: ['routes'] } }]"
    },
    {
      label: "En curso",
      path: "['/driver', { outlets: { driver: ['current'] } }]"
    },
    {
      label: "Resumen",
      path: "['/driver', { outlets: { driver: ['summary', iViajeId] } }]"
    }
  ];

  constructor(private iRouter: Router, private iDriverService: DriverService) {}

  ngOnInit() {
    // se obtienen los recorridos
    /* this.iDriverService.RoutesClient.get().subscribe(
      (recorridos: Array<Recorrido>) => {
        this.iRecorridos = recorridos.sort(recorrido => recorrido.orden);
        //se busca el recorrido actual
        this.iRecorrido = this.iRecorridos[0];
        this.getCurrentRouteTravels();
      }
    ); */
  }
/* 
  delay(): void {
    this.iRouter.navigate(["driver/delay"]);
  }

  analyze(pTravelId: string) {
    this.iRouter.navigate(["driver/report/", pTravelId]);
  }

  stop(): void {
    //this.iDriverService.TravelClient.stop({
    //  travel: this.iCurrentTravel.id
    //}).subscribe(() => this.iDriverService.RoutesClient.get());

    this.iViajeActual.estado = "detenido";
    this.iViajeActual.fechaHoraRealLlegada = new Date().toLocaleString();
    this.iViajeActual = null;
    if (this.iViajes.every(viaje => viaje.estado == "detenido")) {
      this.getNextRoute();
      this.getCurrentRouteTravels();
    } else {
      this.iViajeActual = this.iViajeSiguiente;
    }
  }

  start(pViajeId: number) {
    //this.iDriverService.TravelClient.start({
    //  travel: pTravelId
    //}).subscribe(() => this.iDriverService.RoutesClient.get());

    try {
      if (this.iViajes.length === 0) {
        throw new Error("no hay más viajes pendientes en el recorrido actual");
      }

      const idx = this.iRecorrido.viajes.findIndex(
        viaje => viaje.id == pViajeId
      );
      this.iViajeActual = this.iRecorrido.viajes[idx];
      this.iViajeActual.estado = "actual";
      this.iViajeActual.fechaHoraRealSalida = new Date().toLocaleString();

      this.iViajeSiguiente = this.iRecorrido.viajes[idx + 1] || null;
    } catch (error) {
      //alerta

      this.iViajeActual = null;
      this.getNextRoute();
      this.getCurrentRouteTravels();
    }
  }

  getNextRoute() {
    try {
      if (this.iRecorridos.length === 0) {
        throw new Error("no hay más recorridos");
      }

      const idx = this.iRecorridos.findIndex(
        recorrido => recorrido.id == this.iRecorrido.id
      );

      this.iRecorrido = this.iRecorridos[idx + 1] || null;
    } catch (error) {
      console.log(error);
    }
  }

  getCurrentRouteTravels() {
    try {
      if (!this.iRecorrido) {
        throw new Error("no hay otro recorrido");
      }

      if (this.iRecorrido.viajes.length === 0) {
        throw new Error("no hay más viajes");
      }

      this.iViajes = this.iRecorrido.viajes.sort(travel => travel.orden);
      // si hay un viaje iniciado, sino -1
      let idx = this.iViajes.findIndex(travel => travel.estado === "actual");
      if (idx > 0) {
        // se elimina de la lista de viajes
        this.iViajeActual = this.iViajes[idx];
      }
      this.iViajeSiguiente = this.iViajes[idx + 1];
    } catch (error) {
      console.log(error);
    }
  } */
}
