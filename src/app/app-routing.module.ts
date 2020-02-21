import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginGuard } from "./authentication/guards/login.guard";
import { SigninComponent } from "./authentication/components/signin/signin.component";

export const PATH = {
  AUTHENTICATION: {
    SIGNIN: "authentication/signin"
  },
  DRIVER: "driver",
  ADMINISTRATOR: "administrator"
};

const routes: Routes = [
  {
    path: "",
    redirectTo: PATH.AUTHENTICATION.SIGNIN,
    pathMatch: "full"
  },
  {
    path: PATH.AUTHENTICATION.SIGNIN,
    component: SigninComponent
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
      )
    //canActivate: [LoginGuard]
  },
  {
    path: "**",
    redirectTo: PATH.AUTHENTICATION.SIGNIN
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
