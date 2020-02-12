import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Viaje } from "src/app/core/model/viaje";
import { DriverService } from "src/app/core/services/driver.service";
import { switchMap, tap, map } from "rxjs/operators";

@Component({
  selector: "evince-report",
  templateUrl: "./report.component.html"
})
export class ReportComponent implements OnInit {
  public iTravel: Viaje;

  constructor(
    private iRouter: Router,
    private iActivatedRoute: ActivatedRoute,
    private iDriverService: DriverService
  ) {}

  ngOnInit() {
    this.iActivatedRoute.paramMap
      .pipe(
        switchMap((bActivatedRouteParam: any) =>
          this.iDriverService.TravelClient.get(bActivatedRouteParam.params.id)
        ),
        map(result => result[0])
      )
      .subscribe(travel => (this.iTravel = travel));
  }

  returnToHome() {
    this.iRouter.navigate(["../"], { relativeTo: this.iActivatedRoute });
  }
}
