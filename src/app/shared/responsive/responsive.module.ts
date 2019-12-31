import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavMobileDirective } from './sidenav-mobile.directive';


@NgModule({
  declarations: [SidenavMobileDirective],
  imports: [
    CommonModule
  ],
  exports: [SidenavMobileDirective]
})
export class ResponsiveModule { }
