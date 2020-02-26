import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AdministratorService } from "src/app/core/services/administrator.service";

@Component({
  selector: "evince-routes-view",
  templateUrl: "./routes-view.component.html"
})
export class RoutesViewComponent implements OnInit {
  public iRecorrido: any;
  public iOrigen: string;
  public iDestino: string;

  constructor(
    private iAdministratorService: AdministratorService,
    private iRouter: Router,
    private iActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.iActivatedRoute.snapshot.paramMap.get("id");
    this.iAdministratorService.RoutesClient.getById(Number(id)).subscribe(
      recorrido => {
        this.iRecorrido = recorrido;
        this.iOrigen = recorrido.origen;
        this.iDestino = recorrido.destino;
      }
    );
  }

  public return() {
    this.iRouter.navigate(["../"], { relativeTo: this.iActivatedRoute });
  }

  public analyze(order: number) {
    this.iRouter.navigate(["./travels/order", order], {
      relativeTo: this.iActivatedRoute
    });
  }
}
