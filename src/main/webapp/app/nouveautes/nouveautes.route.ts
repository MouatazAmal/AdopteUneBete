import { Route } from '@angular/router';

import { NouveautesComponent } from './nouveautes.component';

export const NOUV_ROUTE: Route = {
  path: '',
  component: NouveautesComponent,
  data: {
    authorities: [],
    pageTitle: 'nouveautes.title'
  }
};
