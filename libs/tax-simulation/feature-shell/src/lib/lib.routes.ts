import { Route } from '@angular/router';
import { TaxSimulationPageSimulationFeatureShellComponent } from './tax-simulation-page-simulation-feature-shell.component';

export const taxSimulationPageSimulationFeatureShellRoutes: Route[] = [
  {
    path: '',
    component: TaxSimulationPageSimulationFeatureShellComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@monorepo-tools/tax-simulation/page-simulation/feature').then(
            (c) => c.TaxSimulationPageSimulationFeatureComponent
          ),
      },
    ],
  },
];
