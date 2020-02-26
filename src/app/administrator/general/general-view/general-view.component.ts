import { Component, OnInit } from "@angular/core";
import { AdministratorService } from "src/app/core/services/administrator.service";
import { switchMap, repeatWhen, filter } from "rxjs/operators";
import { Subject, BehaviorSubject, empty, ReplaySubject } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: "evince-general-view",
  templateUrl: "./general-view.component.html"
})
export class GeneralViewComponent implements OnInit {
  public iRecorridos: Array<any> = [];
  public iRecorridosFiltrados: Array<any> = [];
  public origenSeleccionado: number;
  public destinoSeleccionado: number;

  private iRunFilter$ = new ReplaySubject<any>(1);

  constructor(private iAdministratorService: AdministratorService, private iRouter: Router, private iActivatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.iAdministratorService.RoutesClient.get(true).subscribe(
      recorridos => (this.iRecorridos = recorridos)
    );

    this.iRunFilter$
      .pipe(
        switchMap(filter =>
          this.iAdministratorService.RoutesClient.getByOrigenDestino(
            filter.origen.id,
            filter.destino.id,
            filter.suscripto
          )
        )
      )
      .subscribe(recorridos => (this.iRecorridosFiltrados = recorridos));
  }

  handleFilterChanges($event) {
    this.iRunFilter$.next($event);
  }

  updateSubscription(id: number) {
    const recorrido = this.iRecorridos.find(r => r.id == id);
    this.iAdministratorService.RoutesClient.subscription(recorrido)
      .pipe(
        switchMap(() => this.iRunFilter$),
        switchMap(filter =>
          this.iAdministratorService.RoutesClient.getByOrigenDestino(
            filter.origen.id,
            filter.destino.id,
            filter.suscripto
          )
        )
      )
      .subscribe(recorridos => (this.iRecorridosFiltrados = recorridos));
  }

  analyze(id: number) {
    this.iRouter.navigate(["../routes", id], {relativeTo: this.iActivatedRoute});
  }
}
