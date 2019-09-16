import { Route } from '@angular/router';

import { AutresComponent } from './autres.component';

export const autresRoute: Route = {
  path: 'autres',
  component: AutresComponent,
  data: {
    authorities: [],
    pageTitle: 'autres.title'
  }
};
