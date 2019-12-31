import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OverviewComponent } from './administrator/overview/overview.component';

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
    loadChildren: () => import("./login/login.module").then(m => m.LoginModule)
  },
  {
    path: "driver",
    loadChildren: () =>
      import("./driver/driver.module").then(m => m.DriverModule)
  },
  {
    path: "administrator",
    loadChildren: () =>
      import("./administrator/administrator.module").then(
        m => m.AdministratorModule
      )
  },
  
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
