import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { taxSimulationPageSimulationFeatureShellRoutes } from './lib.routes';

@Component({
  selector: 'tax-simulation-tax-simulation-page-simulation-feature-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './tax-simulation-page-simulation-feature-shell.component.html',
})
export class TaxSimulationPageSimulationFeatureShellComponent {}
