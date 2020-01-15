import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdministratorComponent } from "./administrator.component";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../shared/material/material.module";
import { ResponsiveModule } from "../shared/responsive/responsive.module";
import { OverviewComponent } from "./overview/overview.component";
import { SecurityComponent } from "./security/security.component";
import { SettingsComponent } from "./settings/settings.component";
<<<<<<< HEAD
import { SubscriptionsComponent } from './overview/components/subscriptions/subscriptions.component';
=======
import { FormsModule } from '@angular/forms';
import { TimeComparativeReportComponent } from './time-comparative-report/time-comparative-report.component';
import { SubscriptionListComponent } from './overview/components/subscription-list/subscription-list.component';
import { SubscriptionFilterComponent } from './overview/components/subscription-filter/subscription-filter.component';
>>>>>>> ba0b0758f15bf029fb731a0acf1bac47d6ef056e

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
<<<<<<< HEAD
    SubscriptionsComponent
=======
    TimeComparativeReportComponent,
    SubscriptionListComponent,
    SubscriptionFilterComponent
>>>>>>> ba0b0758f15bf029fb731a0acf1bac47d6ef056e
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
