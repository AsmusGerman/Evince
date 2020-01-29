import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MAT_SNACK_BAR_DATA } from "@angular/material";
import { MaterialModule } from "../material/material.module";
import { SnackbarService } from "./services/snackbar.service";
import { SnackbarComponent } from "./snackbar/snackbar.component";

@NgModule({
  declarations: [SnackbarComponent],
  imports: [CommonModule, MaterialModule],
  providers: [SnackbarService, { provide: MAT_SNACK_BAR_DATA, useValue: {} }],
  entryComponents: [SnackbarComponent]
})
export class NotificationModule {}
