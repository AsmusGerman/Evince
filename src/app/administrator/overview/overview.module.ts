import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { OverviewComponent } from "./overview.component";
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { TopDelayReportComponent } from './components/top-delay-report/top-delay-report.component';

const routes: Routes = [
  {
    path: "",
    component: OverviewComponent
  }
];

@NgModule({
  declarations: [
    OverviewComponent,
    TopDelayReportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OverviewModule {}
