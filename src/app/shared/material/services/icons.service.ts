import { Injectable } from "@angular/core";
import { MatIconRegistry } from "@angular/material";

@Injectable()
export class IconsService {
  constructor(private matIconRegistry: MatIconRegistry) {
    this.register("sucess", "src/assets/icons/double-tick.svg");
    this.register("error", "src/assets/icons/triangle.svg");
    this.register("info", "src/assets/icons/lamp.svg");
    this.register("warn", "src/assets/icons/alert.svg");
  }
  public register(name: string, path: string) {
    this.matIconRegistry.addSvgIcon(name, path);
  }
}
