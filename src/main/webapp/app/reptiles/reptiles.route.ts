import { Route } from '@angular/router';

import { ReptilesComponent } from './reptiles.component';

export const reptilesRoute: Route = {
  path: 'reptilesyyy',
  component: ReptilesComponent,
  data: {
    authorities: [],
    pageTitle: 'reptiles.title'
  }
};
