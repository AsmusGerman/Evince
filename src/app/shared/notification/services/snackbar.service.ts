import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { SnackbarComponent } from "../snackbar/snackbar.component";

@Injectable()
export class SnackbarService {
  constructor(private iMatSnackbar: MatSnackBar) {}

  public success(data: { title: string; message: string; icon: string }) {
    this.show({
      title: data.title,
      message: data.message,
      icon: data.icon,
      class: "success"
    });
  }

  public info(data: { title: string; message: string; icon: string }) {
    this.show({
      title: data.title,
      message: data.message,
      icon: data.icon,
      class: "info"
    });
  }

  public warn(data: { title: string; message: string; icon: string }) {
    this.show({
      title: data.title,
      message: data.message,
      icon: data.icon,
      class: "warn"
    });
  }

  public danger(data: { title: string; message: string; icon: string }) {
    this.show({
      title: data.title,
      message: data.message,
      icon: data.icon,
      class: "danger"
    });
  }

  public confirm(data: { title: string; message: string; icon: string }) {
    this.show({
      title: data.title,
      message: data.message,
      icon: data.icon,
      class: "info"
    });
  }

  private show(data: { title; message; icon; class }) {
    this.iMatSnackbar.openFromComponent(SnackbarComponent, {
      data: { title: data.title, message: data.message, icon: data.icon },
      panelClass: data.class,
      duration: 10000
    });
  }
}
