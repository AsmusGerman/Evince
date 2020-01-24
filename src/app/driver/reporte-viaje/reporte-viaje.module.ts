import { NgModule } from "@angular/core";
import { ReporteViajeComponent } from "./reporte-viaje.component";
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ResponsiveModule } from 'src/app/shared/responsive/responsive.module';
import { MatInputModule, MatExpansionModule, MatFormFieldModule, MatCardModule } from '@angular/material';
import { DataService } from 'src/app/core/services/data.service';

const routes: Routes = [
  {
/*     path: "driver/retraso/:id",
    component: RetrasoComponent */
  }
];

@NgModule({
  declarations: [
    ReporteViajeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule,
    ResponsiveModule,
    MatInputModule,
    FormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatCardModule
  ],
  providers:[
    DataService
  ]
})
export class ReporteViajeModule {}
