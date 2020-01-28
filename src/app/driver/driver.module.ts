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

const routes: Routes = [
  {
    path: "",
    component: DriverComponent
  }
];

@NgModule({
  declarations: [
    DriverComponent,
    RecorridosListComponent
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
    MatInputModule,
    MatCardModule
  ]
})
export class DriverModule {}
