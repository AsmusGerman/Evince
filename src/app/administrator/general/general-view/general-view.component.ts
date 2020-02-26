import { Component, OnInit, Inject } from "@angular/core";
import { AdministratorService } from "src/app/core/services/administrator.service";
import { switchMap, repeatWhen, filter, map } from "rxjs/operators";
import { Observable, ReplaySubject } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { Resources } from "src/app/core/resources.token";

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

  public iResources: any;

  constructor(
    private iAdministratorService: AdministratorService,
    private iRouter: Router,
    private iActivatedRoute: ActivatedRoute,
    @Inject(Resources) private iResources$: Observable<any>
  ) {}

  ngOnInit() {
    this.iResources$
      .pipe(map(resources => resources.administrator.general))
      .subscribe(resources => {
        this.iResources = resources;
      });

    this.iAdministratorService.RoutesClient.get(false).subscribe(
      recorridos => {
        this.iRecorridos = Array.from(recorridos);
        this.iRecorridosFiltrados = this.iRecorridos.filter(recorrido => recorrido.subscription);
      }
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

  updateSubscription($event) {
    const recorrido = this.iRecorridosFiltrados.find(r => r.id == $event.id);
    recorrido.subscription = $event.subscription;
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
    this.iRouter.navigate(["../routes", id], {
      relativeTo: this.iActivatedRoute
    });
  }
}
