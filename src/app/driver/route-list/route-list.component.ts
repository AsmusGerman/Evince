import { Component, Input } from "@angular/core";
import { Recorrido } from "src/app/core/model/recorrido";

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
        margin: .5rem 0;
        padding: .5rem;
      }
    `
  ]
})
export class RouteListComponent {
  @Input("recorridos") public iRecorridos: Array<Recorrido> = [];
}
