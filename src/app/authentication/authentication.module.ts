import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./components/login/login.component";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../shared/material/material.module";
import { NgxsModule } from "@ngxs/store";
import { AuthState } from "./store/authentication.state";
import { SigninComponent } from "./components/signin/signin.component";
import { AuthenticationService } from "./services/authentication.service";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  }
];

@NgModule({
  declarations: [LoginComponent, SigninComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    NgxsModule.forFeature([AuthState])
  ],
  providers: [AuthenticationService]
})
export class AuthenticationModule {}
