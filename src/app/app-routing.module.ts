import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OverviewComponent } from "./administrator/overview/overview.component";
import { AuthGuard } from "./authentication/guards/authentication.guard";

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
    path: "login",
    loadChildren: () => import("./authentication/authentication.module").then(m => m.AuthenticationModule)
  },
  {
    path: "driver",
    loadChildren: () =>
      import("./driver/driver.module").then(m => m.DriverModule),
    //canActivate: [AuthGuard]
  },
  {
    path: "administrator",
    loadChildren: () =>
      import("./administrator/administrator.module").then(
        m => m.AdministratorModule
      ),
    //canActivate: [AuthGuard]
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
