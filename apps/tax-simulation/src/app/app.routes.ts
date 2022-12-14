import {Routes} from "@angular/router";

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('@monorepo-tools/tax-simulation/page-simulation/feature-shell').then(m => m.taxSimulationPageSimulationFeatureShellRoutes),
  }
]
