import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OverviewComponent } from "./administrator/overview/overview.component";
import { AuthGuard } from "./authentication/guards/authentication.guard";
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
      import("./driver/driver.module").then(m => m.DriverModule)
    //canActivate: [AuthGuard]
  },
  {
    path: PATH.ADMINISTRATOR,
    loadChildren: () =>
      import("./administrator/administrator.module").then(
        m => m.AdministratorModule
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
