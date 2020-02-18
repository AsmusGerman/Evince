import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdministratorComponent } from "./administrator.component";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../shared/material/material.module";
import { ResponsiveModule } from "../shared/responsive/responsive.module";
import { OverviewComponent } from "./overview/overview.component";
import { SecurityComponent } from "./security/security.component";
import { SettingsComponent } from "./settings/settings.component";
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { TimeComparativeReportComponent } from './time-comparative-report/time-comparative-report.component';
import { GeneralListComponent } from './overview/components/general-list/general-list.component';
import { GeneralFilterComponent } from './overview/components/general-filter/general-filter.component';
import { LoginGuard } from '../authentication/guards/login.guard';
import { GeneralChartTopDelaysComponent } from './overview/components/general-chart-top-delays/general-chart-top-delays.component';
import { GeneralChartTopCausesComponent } from './overview/components/general-chart-top-causes/general-chart-top-causes.component';
import { RecorridoListComponent } from './overview/components/recorrido-list/recorrido-list.component';


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
    GeneralListComponent,
    GeneralFilterComponent,
    GeneralChartTopDelaysComponent,
    GeneralChartTopCausesComponent,
    RecorridoListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ResponsiveModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdministratorModule {}
