import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AdministratorService } from "src/app/core/services/administrator.service";
import { map } from "rxjs/operators";

@Component({
  selector: "evince-travels-view",
  templateUrl: "./travels-view.component.html"
})
export class TravelsViewComponent implements OnInit {
  public iRecorridoId: number;
  public iOrigen: string;
  public iDestino: string;
  public iViajes: Array<any>;

  constructor(
    private iRouter: Router,
    private iActivatedRoute: ActivatedRoute,
    private iAdministratorService: AdministratorService
  ) {}

  ngOnInit() {
    const route = this.iActivatedRoute.snapshot.paramMap.get("route");
    const order = this.iActivatedRoute.snapshot.paramMap.get("order");

    this.iRecorridoId = Number(route);

    this.iAdministratorService.RoutesClient.getById(
      this.iRecorridoId
    ).subscribe(recorrido => {
      this.iViajes = recorrido.viajes.filter(viaje => viaje.orden == order);
      this.iDestino = recorrido.destino;
      this.iOrigen = recorrido.origen;
    });
  }

  public return() {
    this.iRouter.navigate(["../../../"], {
      relativeTo: this.iActivatedRoute
    });
  }

  public analyze(id: number) {
    this.iRouter.navigate(["./delays", id], {
      relativeTo: this.iActivatedRoute
    });
  }
}
