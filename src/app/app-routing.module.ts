import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OverviewComponent } from "./administrator/overview/overview.component";
import { AuthGuard } from "./authentication/guards/authentication.guard";
import { SigninComponent } from "./authentication/components/signin/signin.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
  },
  {
    path: "authentication",
    loadChildren: () =>
      import("./authentication/authentication.module").then(
        m => m.AuthenticationModule
      )
  },
  {
    path: "driver",
    loadChildren: () =>
      import("./driver/driver.module").then(m => m.DriverModule)
    //canActivate: [AuthGuard]
  },
  {
    path: "administrator",
    loadChildren: () =>
      import("./administrator/administrator.module").then(
        m => m.AdministratorModule
      )
    //canActivate: [AuthGuard]
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
    path: "**",
    redirectTo: "home"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
