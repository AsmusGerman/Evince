import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { SnackbarComponent } from "../snackbar/snackbar.component";

@Injectable()
export class SnackbarService {
  constructor(private iMatSnackbar: MatSnackBar) {}

  public success(data: {
    title: string | null;
    message: string | null;
    icon: string | null;
  }) {
    this.show({
      title: data.title || "Éxito",
      message: data.message || "",
      icon: data.icon || "success"
    });
  }

  public info(data: {
    title: string | null;
    message: string | null;
    icon: string | null;
  }) {
    this.show({
      title: data.title || "Información",
      message: data.message || "",
      icon: data.icon || "info"
    });
  }

  public warn(data: {
    title: string | null;
    message: string | null;
    icon: string | null;
  }) {
    this.show({
      title: data.title || "Advertencia",
      message: data.message || "",
      icon: data.icon || "warn"
    });
  }

  public error(data: {
    title: string | null;
    message: string | null;
    icon: string | null;
  }) {
    this.show({
      title: data.title || "Error",
      message: data.message || "",
      icon: data.icon || "error"
    });
  }

  private show(data) {
    this.iMatSnackbar.openFromComponent(SnackbarComponent, {
      data,
      duration: 10000
    });
  }
}
