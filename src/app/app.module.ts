import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";
import { NgxsModule } from "@ngxs/store";
import { environment } from "src/environments/environment";
import { AppComponent } from "./app.component";
import { AuthenticationModule } from "./authentication/authentication.module";
import { SigninComponent } from "./authentication/components/signin/signin.component";
import { LoginGuard } from "./authentication/guards/login.guard";
import { TokenInterceptor } from "./authentication/interceptors/token.interceptor";
import { CoreModule } from "./core/core.module";

const routes: Routes = [
  {
    path: "signin",
    component: SigninComponent
  },
  {
    path: "driver",
    loadChildren: () =>
      import("./driver/driver.module").then(m => m.DriverModule),
    canActivate: [LoginGuard]
  },
  {
    path: "administrator",
    loadChildren: () =>
      import("./administrator/administrator.module").then(
        m => m.AdministratorModule
      ),
    canActivate: [LoginGuard]
  },
  {
    path: "**",
    redirectTo: "signin"
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    NgxsModule.forRoot([], { developmentMode: !environment.production }),
    NgxsStoragePluginModule.forRoot({
      key: ["auth.token", "auth.refreshToken"]
    }),
    CoreModule,
    AuthenticationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
