import { Component, Input, OnInit } from "@angular/core";
import { Recorrido } from "src/app/core/model/recorrido";
import { DriverService } from "src/app/core/services/driver.service";

@Component({
  selector: "evince-route-list",
  templateUrl: "./route-list.component.html",
  styles: [
    `
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
    `
  ]
})
export class RouteListComponent implements OnInit {
  public iRecorridos: Array<Recorrido> = [];

  constructor(private iDriverService: DriverService) {}

  ngOnInit() {
    this.iDriverService.RoutesClient.getAll().subscribe(
      routes => (this.iRecorridos = routes)
    );
  }
}
