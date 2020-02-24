import { Injectable } from "@angular/core";
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { isString } from "util";

@Injectable()
export class IconsService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private iSanitizer: DomSanitizer
  ) {
    const source = {
      weather: ["cloud", "night", "rainy", "snowy", "storm", "sun", "humidity"]
    };
    this.load(source);
  }

  public load(source) {
    const icons = Array.from(source);
    for (const namespace in icons) {
      this.register(namespace, icons);
    }
  }

  public register(namespace: string, icons) {
    for (const icon of icons) {
      this.matIconRegistry.addSvgIconInNamespace(
        namespace,
        icon,
        `src/assets/icons/${namespace}/${name}.svg`
      );
    }
  }
}
