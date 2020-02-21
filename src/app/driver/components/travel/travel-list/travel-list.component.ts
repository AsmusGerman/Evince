import { Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { Recorrido } from "src/app/core/model/recorrido";
import { Viaje } from "src/app/core/model/viaje";
import { DriverService } from "src/app/core/services/driver.service";
import { DriverState } from "src/app/driver/store/driver.state";
import { EstadoViaje } from "src/app/core/model/estado-viaje";
import { pluck } from "rxjs/operators";
import { StartTravel } from "src/app/driver/store/driver.model";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "evince-travel-list",
  templateUrl: "./travel-list.component.html",
  styleUrls: ["./travel-list.component.scss"]
})
export class TravelListComponent implements OnInit {
  @Select(DriverState.CurrentTravel)
  public iViajeActual: Observable<Viaje>;

  public iViajesFinalizados: Observable<Array<Viaje>>;

  constructor(
    private iStore: Store,
    private iRouter: Router,
    private iRoute: ActivatedRoute,
    private iDriverService: DriverService
  ) {}

  ngOnInit() {
    this.iViajesFinalizados = this.iDriverService.TravelClient.lasts();
  }

  public start(travel: number) {
    this.iStore.dispatch(new StartTravel({ travel })).subscribe(() => {
      this.iRouter.navigate(["driver/home/current"]);
    });
  }

  public showCurrentRoadmap($event) {
    this.iRouter.navigate(["../current"], { relativeTo: this.iRoute });
  }

  public showSummary(travel: number) {
    this.iRouter.navigate(["../summary", travel], { relativeTo: this.iRoute });
  }
}
