import { Component, OnInit } from '@angular/core';
import { Viaje } from 'src/app/core/model/viaje';
import { DriverService } from 'src/app/core/services/driver.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'evince-finished-travel-summary',
  templateUrl: './finished-travel-summary.component.html'
})
export class FinishedTravelSummaryComponent implements OnInit {

  public iViaje: Viaje;
  constructor(private route: ActivatedRoute, private iDriverService: DriverService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.iDriverService.TravelClient.get(Number(id)).subscribe(travel => this.iViaje = travel);
  }
}
