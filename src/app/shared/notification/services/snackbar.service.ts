import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { SnackbarComponent } from "../snackbar/snackbar.component";

@Injectable()
export class SnackbarService {
  constructor(private iMatSnackbar: MatSnackBar) {}

  public success(data: { message: string }) {
    this.show({
      message: data.message,
      class: "success"
    });
  }

  public info(data: { message: string }) {
    this.show({
      message: data.message,
      class: "info"
    });
  }

  public warn(data: { message: string }) {
    this.show({
      message: data.message,
      class: "warn"
    });
  }

  public danger(data: { message: string }) {
    this.show({
      message: data.message,
      class: "danger"
    });
  }

  private show(data: { message; class }) {
    this.iMatSnackbar.openFromComponent(SnackbarComponent, {
      data: { message: data.message },
      panelClass: data.class,
      duration: 1000
    });
  }
}
