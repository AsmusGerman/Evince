import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../shared/material/material.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
  path: "",
  component: HomeComponent
}
]

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class HomeModule { }
