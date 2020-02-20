import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "../material/material.module";

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, MaterialModule, BrowserAnimationsModule],
  entryComponents: [HeaderComponent]
})
export class HeaderModule {}
