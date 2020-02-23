import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DriverComponent } from "./driver.component";
import { Routes, RouterModule } from "@angular/router";
import { NgxsModule } from "@ngxs/store";

import { MaterialModule } from "../shared/material/material.module";
import { ResponsiveModule } from "../shared/responsive/responsive.module";
import { ReactiveFormsModule } from "@angular/forms";
import { DataService } from "../core/services/data.service";
import { TravelListComponent } from "./components/travel/travel-list/travel-list.component";
import { RouteListComponent } from "./components/route/route-list/route-list.component";
import { CurrentRouteComponent } from "./components/route/current-route/current-route.component";
import { FinishedTravelSummaryComponent } from "./components/travel/finished-travel-summary/finished-travel-summary.component";
import { DelayComponent } from "./components/delay/delay.component";
import { NextTravelCardComponent } from "./components/travel/next-travel-card/next-travel-card.component";
import { CurrentTravelCardComponent } from "./components/travel/current-travel-card/current-travel-card.component";
import { HeaderModule } from "../shared/header/header.module";
import { DriverState } from "./store/driver.state";
import { CurrentTravelTimerService } from "./services/current-travel-timer.service";

const routes: Routes = [
  {
    path: "home",
    component: DriverComponent,
    children: [
      {
        path: "",
        redirectTo: "travels"
      },
      {
        path: "travels",
        component: TravelListComponent,
      },
      {
        path: "routes",
        component: RouteListComponent,
      },
      {
        path: "current",
        component: CurrentRouteComponent,
      },
      {
        path: "summary/:id",
        component: FinishedTravelSummaryComponent,
      }
    ]
  },
  {
    path: "**",
    redirectTo: "home"
  }
];

@NgModule({
  declarations: [
    DriverComponent,
    DelayComponent,
    RouteListComponent,
    CurrentRouteComponent,
    TravelListComponent,
    NextTravelCardComponent,
    CurrentTravelCardComponent,
    FinishedTravelSummaryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([DriverState]),
    MaterialModule,
    ResponsiveModule,
    HeaderModule
  ],
  providers: [DataService, CurrentTravelTimerService],
  entryComponents: [DelayComponent]
})
export class DriverModule {}
