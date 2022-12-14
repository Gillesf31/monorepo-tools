import { Route } from '@angular/router';

export const taxSimulationPageSimulationFeatureShellRoutes: Route[] = [
  { path: '', loadComponent: () => import('@monorepo-tools/tax-simulation/page-simulation/feature').then(c => c.TaxSimulationPageSimulationFeatureComponent) },
];
