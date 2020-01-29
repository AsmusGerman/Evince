import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdministratorComponent } from "./administrator.component";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../shared/material/material.module";
import { ResponsiveModule } from "../shared/responsive/responsive.module";
import { OverviewComponent } from "./overview/overview.component";
import { SecurityComponent } from "./security/security.component";
import { SettingsComponent } from "./settings/settings.component";
import { FormsModule } from '@angular/forms';
import { TimeComparativeReportComponent } from './time-comparative-report/time-comparative-report.component';
import { SubscriptionListComponent } from './overview/components/subscription-list/subscription-list.component';
import { SubscriptionFilterComponent } from './overview/components/subscription-filter/subscription-filter.component';
import { LoginGuard } from '../authentication/guards/login.guard';

const routes: Routes = [
  {
    path: "",
    component: AdministratorComponent
  }
];

@NgModule({
  declarations: [
    AdministratorComponent,
    OverviewComponent,
    SecurityComponent,
    SettingsComponent,
    TimeComparativeReportComponent,
    SubscriptionListComponent,
    SubscriptionFilterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ResponsiveModule,
    FormsModule
  ]
})
export class AdministratorModule {}
