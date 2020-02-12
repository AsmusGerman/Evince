import { Component, OnInit, Input } from '@angular/core';
import { Viaje } from 'src/app/core/model/viaje';
import { Router } from '@angular/router';

@Component({
  selector: 'evince-travel-detail',
  templateUrl: './travel-detail.component.html'
})
export class TravelDetailComponent implements OnInit {

  @Input("viaje") iViaje: Viaje;
  @Input("with-analysis") iWithAnalysis: boolean;

  constructor(private iRouter: Router) { }

  ngOnInit() {
  }

  analyze() {
    this.iRouter.navigate(["driver/report/", this.iViaje.id]);
  }
}
