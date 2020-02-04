import { NgModule, InjectionToken } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./components/login/login.component";
import { MaterialModule } from "../shared/material/material.module";
import { NgxsModule } from "@ngxs/store";
import { AuthState } from "./store/authentication.state";
import { SignupComponent } from "./components/signup/signup.component";
import { AuthenticationService } from "./services/authentication.service";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginHandler } from "./store/handlers/login.handler";
import { LogoutHandler } from "./store/handlers/logout.handler";
import { RegisterHandler } from "./store/handlers/register.handler";

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
