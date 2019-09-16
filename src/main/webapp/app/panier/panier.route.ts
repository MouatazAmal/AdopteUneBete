import { Route } from '@angular/router';

import { PanierComponent } from './panier.component';

export const panierRoute: Route = {
  path: 'panieryyy',
  component: PanierComponent,
  data: {
    authorities: [],
    pageTitle: 'panier.title'
  }
};
