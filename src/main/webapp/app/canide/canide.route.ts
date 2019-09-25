import { Route } from '@angular/router';

import { CanideComponent } from './canide.component';

export const canideRoute: Route = {
  path: 'canide',
  component: CanideComponent,
  data: {
    authorities: [],
    pageTitle: 'canide.title'
  }
};
