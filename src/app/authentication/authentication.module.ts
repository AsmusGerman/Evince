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

@NgModule({
  declarations: [LoginComponent, SigninComponent],
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
  ],
  entryComponents:[ LoginComponent, SigninComponent]
})
export class AuthenticationModule {}
