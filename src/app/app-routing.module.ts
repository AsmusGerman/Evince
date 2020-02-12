import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OverviewComponent } from "./administrator/overview/overview.component";
import { AuthenticationGuard } from "./authentication/guards/authentication.guard";
import { SigninComponent } from "./authentication/components/signin/signin.component";
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
    redirectTo: PATH.HOME,
    pathMatch: "full"
  },
  {
    path: PATH.HOME,
    loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
  },
  {
    path: PATH.AUTHENTICATION,
    children: [
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "signin",
        component: SigninComponent
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
      //canActivate: [LoginGuard]
  },
  {
    path: PATH.ADMINISTRATOR,
    loadChildren: () =>
      import("./administrator/administrator.module").then(
        m => m.AdministratorModule
      ),
      //canActivate: [LoginGuard]
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
