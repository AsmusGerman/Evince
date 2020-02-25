import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdministratorService } from 'src/app/core/services/administrator.service';

@Component({
  selector: 'evince-routes-view',
  templateUrl: './routes-view.component.html'
})
export class RoutesViewComponent implements OnInit {

  public iRecorrido: any;
  constructor(private iAdministratorService: AdministratorService, private iRouter: Router, private iActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.iActivatedRoute.snapshot.paramMap.get("id");
    this.iAdministratorService.RoutesClient.getById(Number(id)).subscribe(recorrido => this.iRecorrido = recorrido);
  }

  public return() {
    this.iRouter.navigate(["general"]);
  }

  public analyze(order: number) {
    this.iRouter.navigate(["./travels/order", order], {relativeTo: this.iActivatedRoute});
  }
}
