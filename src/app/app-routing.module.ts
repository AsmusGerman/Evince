import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OverviewComponent } from "./administrator/overview/overview.component";
import { AuthenticationGuard } from "./authentication/guards/authentication.guard";
import { SigninComponent } from "./authentication/components/signin/signin.component";

export const PATH = {
  HOME: "home",
  AUTHENTICATION: "authentication",
  DRIVER: "driver",
  ADMINISTRATOR: "administrator"
};

const routes: Routes = [
  {
    path: "",
    redirectTo: PATH.HOME,
    pathMatch: "full"
  },
  {
    path: PATH.HOME,
    loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
  },
  {
    path: PATH.AUTHENTICATION,
    loadChildren: () =>
      import("./authentication/authentication.module").then(
        m => m.AuthenticationModule
      )
  },
  {
    path: PATH.DRIVER,
    loadChildren: () =>
      import("./driver/driver.module").then(m => m.DriverModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: PATH.ADMINISTRATOR,
    loadChildren: () =>
      import("./administrator/administrator.module").then(
        m => m.AdministratorModule
      ),
    canActivate: [AuthenticationGuard]
  },
  {
    path: "driver/retraso/:id",
    loadChildren: () =>
      import("./driver/retraso/retraso.module").then(
        m => m.RetrasoModule
      )
    //canActivate: [AuthGuard]
  },
  {
    path: "driver/reporte-viaje/:id",
    loadChildren: () =>
      import("./driver/reporte-viaje/reporte-viaje.module").then(
        m => m.ReporteViajeModule
      )
    //canActivate: [AuthGuard]
  },
  {
    path: "**",
    redirectTo: PATH.HOME
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      //enableTracing: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
