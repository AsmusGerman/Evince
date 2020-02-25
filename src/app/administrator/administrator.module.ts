import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticationModule } from "../authentication/authentication.module";
import { SignupComponent } from "../authentication/components/signup/signup.component";
import { HeaderModule } from "../shared/header/header.module";
import { MaterialModule } from "../shared/material/material.module";
import { ResponsiveModule } from "../shared/responsive/responsive.module";
import { AdministratorComponent } from './administrator.component';
import { GeneralChartTopCausesComponent } from './general/general-chart-top-causes/general-chart-top-causes.component';
import { GeneralChartTopDelaysComponent } from './general/general-chart-top-delays/general-chart-top-delays.component';
import { GeneralFilterComponent } from './general/general-filter/general-filter.component';
import { GeneralListComponent } from './general/general-list/general-list.component';
import { GeneralViewComponent } from './general/general-view/general-view.component';
import { RecorridoChartCausesComponent } from './recorrido/recorrido-chart-causes/recorrido-chart-causes.component';
import { RecorridoChartPercentDelaysComponent } from './recorrido/recorrido-chart-percent-delays/recorrido-chart-percent-delays.component';
import { RecorridoListComponent } from './recorrido/recorrido-list/recorrido-list.component';
import { RoutesViewComponent } from './recorrido/routes-view/routes-view.component';
import { DelaysViewComponent } from './retraso/delays-view/delays-view.component';
import { RetrasoListComponent } from './retraso/retraso-list/retraso-list.component';
import { TravelsViewComponent } from './viajes/travels-view/travels-view.component';
import { ViajesChartCompareComponent } from './viajes/viajes-chart/viajes-chart-compare.component';
import { ViajesListComponent } from './viajes/viajes-list/viajes-list.component';

const routes: Routes = [
  {
    path: "home",
    component: AdministratorComponent,
    children: [
      {
        path: "",
        redirectTo: "general"
      },
      {
        path: "general",
        component: GeneralViewComponent
      },
      {
        path: "routes/:id",
        component: RoutesViewComponent
      },
      {
        path: "routes/:route/travels/order/:order",
        component: TravelsViewComponent
      },
      {
        path: "routes/:route/travels/order/:order/delays/:travel",
        component: DelaysViewComponent
      }
    ]
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "**",
    redirectTo: "home"
  }
];

@NgModule({
  declarations: [
    AdministratorComponent,
    GeneralListComponent,
    GeneralFilterComponent,
    GeneralChartTopDelaysComponent,
    GeneralChartTopCausesComponent,
    RecorridoListComponent,
    ViajesListComponent,
    RecorridoChartPercentDelaysComponent,
    RecorridoChartCausesComponent,
    ViajesChartCompareComponent,
    RetrasoListComponent,
    GeneralViewComponent,
    RoutesViewComponent,
    TravelsViewComponent,
    DelaysViewComponent
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
