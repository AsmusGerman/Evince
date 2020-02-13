import { Component, OnInit } from "@angular/core";
import { AdministratorService } from "src/app/core/services/administrator.service";
import { Recorrido } from "src/app/core/model/recorrido";

@Component({
  selector: "evince-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.scss"]
})
export class OverviewComponent implements OnInit {
  constructor(private iAdministratorService: AdministratorService) {}
  private iRecorridos: Array<Recorrido>;
  ngOnInit() {
    this.iAdministratorService.RoutesClient.get().subscribe(
      recorridos => (this.iRecorridos = recorridos)
    );
  }
}
