import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'evince-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {}
