import { Route } from '@angular/router';

import { SuiviCommandeComponent } from './suivi-commande.component';

export const SuiviCommandeRoute: Route = {
  path: 'suivi-commande',
  component: SuiviCommandeComponent,
  data: {
    authorities: [],
    pageTitle: 'SuiviCommande.title'
  }
};
