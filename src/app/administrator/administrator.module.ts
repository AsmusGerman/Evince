import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdministratorComponent } from "./administrator.component";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../shared/material/material.module";
import { ResponsiveModule } from "../shared/responsive/responsive.module";
import { OverviewComponent } from "./overview/overview.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TimeComparativeReportComponent } from "./time-comparative-report/time-comparative-report.component";
import { GeneralListComponent } from "./overview/components/general/general-list/general-list.component";
import { GeneralFilterComponent } from "./overview/components/general/general-filter/general-filter.component";
import { GeneralChartTopDelaysComponent } from "./overview/components/general/general-chart-top-delays/general-chart-top-delays.component";
import { GeneralChartTopCausesComponent } from "./overview/components/general/general-chart-top-causes/general-chart-top-causes.component";
import { RecorridoListComponent } from "./overview/components/recorrido/recorrido-list/recorrido-list.component";
import { RecorridoChartPercentDelaysComponent } from "./overview/components/recorrido/recorrido-chart-percent-delays/recorrido-chart-percent-delays.component";
import { RecorridoChartCausesComponent } from "./overview/components/recorrido/recorrido-chart-causes/recorrido-chart-causes.component";
import { ViajesListComponent } from "./overview/components/viajes/viajes-list/viajes-list.component";
import { HeaderModule } from '../shared/header/header.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { SignupComponent } from '../authentication/components/signup/signup.component';

const routes: Routes = [
  {
    path: "home",
    component: AdministratorComponent,
    children: [
      {
        path: "",
        redirectTo: "overview"
      },
      {
        path: "overview",
        component: OverviewComponent
      },
      {
        path: "signup",
        component: SignupComponent
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
    AdministratorComponent,
    OverviewComponent,
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
    ReactiveFormsModule,
    HeaderModule,
    AuthenticationModule
  ]
})
export class AdministratorModule {}
