import { Component, OnInit } from '@angular/core';
import { Viaje } from 'src/app/core/model/viaje';
import { DriverService } from 'src/app/core/services/driver.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'evince-finished-travel-summary',
  templateUrl: './finished-travel-summary.component.html'
})
export class FinishedTravelSummaryComponent implements OnInit {

  public iViaje: Observable<Viaje>;
  constructor(private route: ActivatedRoute, private iDriverService: DriverService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.iViaje = this.iDriverService.TravelClient.get(Number(id));
  }
}
