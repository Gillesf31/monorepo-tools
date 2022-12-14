import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'monorepo-tools-root',
  template: '<router-outlet></router-outlet>',
  standalone: true,
  imports: [
    RouterOutlet
  ]
})
export class AppComponent {
  title = 'tax-simulation';
}
