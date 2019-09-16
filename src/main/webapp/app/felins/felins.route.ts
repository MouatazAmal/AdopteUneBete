import { Route } from '@angular/router';

import { FelinsComponent } from './felins.component';

export const felinsRoute: Route = {
  path: 'felins',
  component: FelinsComponent,
  data: {
    authorities: [],
    pageTitle: 'felins.title'
  }
};
