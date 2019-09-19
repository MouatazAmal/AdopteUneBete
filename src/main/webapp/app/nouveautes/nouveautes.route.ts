import { Route } from '@angular/router';

import { NouveautesComponent } from './nouveautes.component';

export const nouveautesRoute: Route = {
  path: 'nouveautes',
  component: NouveautesComponent,
  data: {
    authorities: [],
    pageTitle: 'nouveautes.title'
  }
};
