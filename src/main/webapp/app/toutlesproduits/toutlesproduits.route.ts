import { Route } from '@angular/router';

import { ToutlesproduitsComponent } from './toutlesproduits.component';

export const toutlesproduitsRoute: Route = {
  path: 'toutlesproduits',
  component: ToutlesproduitsComponent,
  data: {
    authorities: [],
    pageTitle: 'toutlesproduits.title'
  }
};
