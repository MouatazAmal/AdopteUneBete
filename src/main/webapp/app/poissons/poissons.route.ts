import { Route } from '@angular/router';

import { PoissonsComponent } from './poissons.component';

export const poissonsRoute: Route = {
  path: 'poissons',
  component: PoissonsComponent,
  data: {
    authorities: [],
    pageTitle: 'poissons.title'
  }
};
