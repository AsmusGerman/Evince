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
import { LoginGuard } from '../authentication/guards/login.guard';
import { GeneralListComponent } from './overview/components/general/general-list/general-list.component';
import { GeneralFilterComponent } from './overview/components/general/general-filter/general-filter.component';
import { GeneralChartTopDelaysComponent } from './overview/components/general/general-chart-top-delays/general-chart-top-delays.component';
import { GeneralChartTopCausesComponent } from './overview/components/general/general-chart-top-causes/general-chart-top-causes.component';
import { RecorridoListComponent } from './overview/components/recorrido/recorrido-list/recorrido-list.component';
import { RecorridoChartPercentDelaysComponent } from './overview/components/recorrido/recorrido-chart-percent-delays/recorrido-chart-percent-delays.component';
import { RecorridoChartCausesComponent } from './overview/components/recorrido/recorrido-chart-causes/recorrido-chart-causes.component';
import { ViajesListComponent } from './overview/components/viajes/viajes-list/viajes-list.component';

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
    RecorridoListComponent,
    ViajesListComponent,
    RecorridoChartPercentDelaysComponent,
    RecorridoChartCausesComponent
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
