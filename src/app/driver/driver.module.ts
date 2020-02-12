import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DriverComponent } from "./driver.component";
import { Routes, RouterModule } from "@angular/router";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { MatCardModule } from "@angular/material";

import { MaterialModule } from "../shared/material/material.module";
import { ResponsiveModule } from "../shared/responsive/responsive.module";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { DataService } from "../core/services/data.service";
import { DelayComponent } from "./delay/delay.component";
import { RouteListComponent } from "./route-list/route-list.component";
import { ReportComponent } from "./report/report.component";
import { TravelDetailComponent } from './travel-detail/travel-detail.component';
import { CurrentRouteComponent } from './current-route/current-route.component';

const routes: Routes = [
  {
    path: "home",
    component: DriverComponent
  },
  {
    path: "delay",
    component: DelayComponent,
  },
  {
    path: "report/:id",
    component: ReportComponent
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
    ReportComponent,
    TravelDetailComponent,
    CurrentRouteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ResponsiveModule,
    MatInputModule,
    FormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  providers: [DataService]
})
export class DriverModule {}
