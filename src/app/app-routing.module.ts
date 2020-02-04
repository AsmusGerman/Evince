import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "./authentication/components/signup/signup.component";
import { LoginGuard } from "./authentication/guards/login.guard";
import { LoginComponent } from "./authentication/components/login/login.component";

export const PATH = {
  HOME: "home",
  AUTHENTICATION: "authentication",
  DRIVER: "driver",
  ADMINISTRATOR: "administrator"
};

const routes: Routes = [
  {
    path: "",
    redirectTo: PATH.AUTHENTICATION,
    pathMatch: "full"
  },
  {
    path: PATH.AUTHENTICATION,
    children: [
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "signup",
        component: SignupComponent
      },
      {
        path: "**",
        redirectTo: "/login"
      }
    ]
  },

  {
    path: PATH.DRIVER,
    loadChildren: () =>
      import("./driver/driver.module").then(m => m.DriverModule),
      canActivate: [LoginGuard]
  },
  {
    path: PATH.ADMINISTRATOR,
    loadChildren: () =>
      import("./administrator/administrator.module").then(
        m => m.AdministratorModule
      ),
      canActivate: [LoginGuard]
  },
  {
    path: "driver/retraso/:id",
    loadChildren: () =>
      import("./driver/retraso/retraso.module").then(m => m.RetrasoModule)
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
    redirectTo: PATH.AUTHENTICATION
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
