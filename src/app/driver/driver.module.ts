import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DriverComponent } from "./driver/driver.component";
import { Routes, RouterModule } from "@angular/router";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material';

const routes: Routes = [
  {
    path: "",
    component: DriverComponent
  }
];

@NgModule({
  declarations: [DriverComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule
  ]
})
export class DriverModule {}
