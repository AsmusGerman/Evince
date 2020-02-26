import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticationModule } from "../authentication/authentication.module";
import { SignupComponent } from "../authentication/components/signup/signup.component";
import { HeaderModule } from "../shared/header/header.module";
import { MaterialModule } from "../shared/material/material.module";
import { AdministratorComponent } from './administrator.component';
import { GeneralViewComponent } from './general/general-view/general-view.component';
import { RoutesViewComponent } from './routes/routes-view/routes-view.component';
import { TravelsViewComponent } from './travels/travels-view/travels-view.component';
import { DelaysViewComponent } from './delays/delays-view/delays-view.component';
import { GeneralListComponent } from './general/general-list/general-list.component';
import { GeneralFilterComponent } from './general/general-filter/general-filter.component';
import { GeneralChartTopDelaysComponent } from './general/general-chart-top-delays/general-chart-top-delays.component';
import { GeneralChartTopCausesComponent } from './general/general-chart-top-causes/general-chart-top-causes.component';
import { RoutesListComponent } from './routes/routes-list/routes-list.component';
import { RoutesChartPercentDelaysComponent } from './routes/routes-chart-percent-delays/routes-chart-percent-delays.component';
import { RoutesChartCausesComponent } from './routes/routes-chart-causes/routes-chart-causes.component';
import { TravelsListComponent } from './travels/travels-list/travels-list.component';
import { TravelsChartCompareComponent } from './travels/travels-chart/travels-chart-compare.component';
import { DelaysListComponent } from './delays/delays-list/delays-list.component';

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
    GeneralViewComponent,
    RoutesViewComponent,
    RoutesListComponent,
    RoutesChartPercentDelaysComponent,
    RoutesChartCausesComponent,
    TravelsViewComponent,
    TravelsListComponent,
    TravelsChartCompareComponent,
    DelaysViewComponent,
    DelaysListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderModule,
    AuthenticationModule
  ]
})
export class AdministratorModule {}
