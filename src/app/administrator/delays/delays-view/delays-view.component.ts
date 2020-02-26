import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AdministratorService } from "src/app/core/services/administrator.service";
import { map, tap } from "rxjs/operators";

@Component({
  selector: "evince-delays-view",
  templateUrl: "./delays-view.component.html"
})
export class DelaysViewComponent implements OnInit {
  public iRetrasos: Array<any>;
  public iOrigen: string;
  public iDestino: string;

  constructor(
    private iRouter: Router,
    private iActivatedRoute: ActivatedRoute,
    private iAdministratorService: AdministratorService
  ) {}

  ngOnInit() {
    const route = this.iActivatedRoute.snapshot.paramMap.get("route");
    const travel = this.iActivatedRoute.snapshot.paramMap.get("travel");

    this.iAdministratorService.RoutesClient.getById(Number(route))
      .pipe(
        tap(recorrido => {
          this.iDestino = recorrido.destino;
          this.iOrigen = recorrido.origen;
        }),
        map(recorrido => recorrido.viajes.find(viaje => viaje.id == travel))
      )
      .subscribe(({ retrasos }) => (this.iRetrasos = retrasos));
  }

  public return() {
    this.iRouter.navigate(["../../"], {
      relativeTo: this.iActivatedRoute
    });
  }
}
