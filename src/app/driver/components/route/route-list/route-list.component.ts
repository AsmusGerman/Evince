import { Component, Input, OnInit } from "@angular/core";
import { Recorrido } from "src/app/core/model/recorrido";
import { DriverService } from "src/app/core/services/driver.service";
import { Observable } from 'rxjs';

@Component({
  selector: "evince-route-list",
  templateUrl: "./route-list.component.html"
})
export class RouteListComponent implements OnInit {
  public iRecorridos: Observable<Array<Recorrido>>;

  constructor(private iDriverService: DriverService) {}

  ngOnInit() {
    this.iRecorridos = this.iDriverService.RoutesClient.getAll();
  }
}
