import { NgModule, ModuleWithProviders, APP_INITIALIZER } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SigninComponent } from "./components/signin/signin.component";
import { MaterialModule } from "../shared/material/material.module";
import { NgxsModule } from "@ngxs/store";
import { AuthState } from "./store/authentication.state";
import { SignupComponent } from "./components/signup/signup.component";
import { AuthenticationService } from "./services/authentication.service";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [SigninComponent, SignupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxsModule.forFeature([AuthState])
  ],
  providers: [AuthenticationService],
  entryComponents: [SigninComponent, SignupComponent],
  exports: [SigninComponent, SignupComponent]
})
export class AuthenticationModule {}
