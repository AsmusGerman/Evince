import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DriverComponent } from "./driver.component";
import { Routes, RouterModule } from "@angular/router";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";

import { MatCardModule } from '@angular/material';

import { MaterialModule } from "../shared/material/material.module";
import { ResponsiveModule } from "../shared/responsive/responsive.module";
import { FormsModule } from '@angular/forms';
import { RecorridosListComponent } from './recorridos-list/recorridos-list.component';
import { RetrasoComponent } from './retraso/retraso.component';
import { ReporteViajeComponent } from './reporte-viaje/reporte-viaje.component';
import { ReactiveFormsModule } from "@angular/forms";
import { DataService } from '../core/services/data.service';
import { LoginGuard } from '../authentication/guards/login.guard';

const routes: Routes = [
  {
    path: "",
    component: DriverComponent
  },
  {
    path: "retraso",
    component: RetrasoComponent
  },
  {
    path: "reporte-viaje",
    component: ReporteViajeComponent
  }
];

@NgModule({
  declarations: [
    DriverComponent,
    RecorridosListComponent,
    RetrasoComponent,
    ReporteViajeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ResponsiveModule,
    MatInputModule,
    FormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  providers:[
    DataService
  ]
})
export class DriverModule {}
