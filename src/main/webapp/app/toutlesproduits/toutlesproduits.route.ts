import { Route } from '@angular/router';

import { ToutlesproduitsComponent } from './toutlesproduits.component';

export const toutlesproduitsRoute: Route = {
  path: '',
  component: ToutlesproduitsComponent,
  data: {
    authorities: [],
    pageTitle: 'toutlesproduits.title'
  }
};
