import { NgModule } from "@angular/core";
import { RetrasoComponent } from "./retraso.component";
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: "driver/retraso/:id",
    component: RetrasoComponent
  }
];

@NgModule({
  declarations: [
    RetrasoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RetrasoModule {}
