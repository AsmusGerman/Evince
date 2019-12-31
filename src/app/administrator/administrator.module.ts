import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdministratorComponent } from "./administrator/administrator.component";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../shared/material/material.module";
import { ResponsiveModule } from "../shared/responsive/responsive.module";
import { OverviewComponent } from "./overview/overview.component";
import { SecurityComponent } from "./security/security.component";
import { SettingsComponent } from "./settings/settings.component";

const routes: Routes = [
  {
    path: "",
    component: AdministratorComponent
  }
];

@NgModule({
  declarations: [
    AdministratorComponent,
    OverviewComponent,
    SecurityComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ResponsiveModule
  ]
})
export class AdministratorModule {}
