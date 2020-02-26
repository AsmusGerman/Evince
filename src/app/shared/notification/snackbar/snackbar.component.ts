import { Component, OnInit, Input, Inject } from "@angular/core";
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from "@angular/material";

@Component({
  selector: "evince-snackbar",
  templateUrl: "./snackbar.component.html"
})
export class SnackbarComponent {
  constructor(
    public iMatSnackbarRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA)
    public iData: {
      message: string;
    }
  ) {}
}
