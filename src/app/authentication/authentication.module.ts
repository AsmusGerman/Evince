import { NgModule, APP_INITIALIZER } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./components/login/login.component";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../shared/material/material.module";
import { NgxsModule } from "@ngxs/store";
import { AuthState } from "./store/authentication.state";
import { SigninComponent } from "./components/signin/signin.component";
import { AuthenticationService } from "./services/authentication.service";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginHandler } from "./store/handlers/login.handler";
import { LogoutHandler } from "./store/handlers/logout.handler";
import { RegisterHandler } from "./store/handlers/register.handler";
import { LoginGuard } from "./guards/login.guard";
import { AuthenticationResources } from "./authentication-resources.token";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "register",
    component: SigninComponent
  },
  {
    path: "**",
    redirectTo: "login"
  }
];

@NgModule({
  declarations: [LoginComponent, SigninComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
    NgxsModule.forFeature([AuthState])
  ],
  providers: [
    AuthenticationService,
    LoginHandler,
    LogoutHandler,
    RegisterHandler
  ]
})
export class AuthenticationModule {}
