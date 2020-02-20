import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DriverComponent } from "./driver.component";
import { Routes, RouterModule } from "@angular/router";

import { MaterialModule } from "../shared/material/material.module";
import { ResponsiveModule } from "../shared/responsive/responsive.module";
import { ReactiveFormsModule } from "@angular/forms";
import { DataService } from "../core/services/data.service";
import { TravelListComponent } from './components/travel/travel-list/travel-list.component';
import { RouteListComponent } from './components/route/route-list/route-list.component';
import { CurrentRouteComponent } from './components/route/current-route/current-route.component';
import { FinishedTravelSummaryComponent } from './components/travel/finished-travel-summary/finished-travel-summary.component';
import { DelayComponent } from './components/delay/delay.component';
import { NextTravelCardComponent } from './components/travel/next-travel-card/next-travel-card.component';
import { CurrentTravelCardComponent } from './components/travel/current-travel-card/current-travel-card.component';
import { HeaderModule } from '../shared/header/header.module';

const routes: Routes = [
  {
    path: "home",
    component: DriverComponent
  },
  {
    path: "travels",
    component: TravelListComponent,
    outlet: "driver"
  },
  {
    path: "routes",
    component: RouteListComponent,
    outlet: "driver"
  },
  {
    path: "current/:id",
    component: CurrentRouteComponent,
    outlet: "driver"
  },
  {
    path: "summary/:id",
    component: FinishedTravelSummaryComponent,
    outlet: "driver"
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
    RouterModule.forChild(routes),
    MaterialModule,
    ResponsiveModule,
    ReactiveFormsModule,
    HeaderModule
  ],
  providers: [DataService]
})
export class DriverModule {}
