import { Route } from '@angular/router';

import { ReptilesComponent } from './reptiles.component';

export const reptilesRoute: Route = {
  path: 'reptiles',
  component: ReptilesComponent,
  data: {
    authorities: [],
    pageTitle: 'reptiles.title'
  }
};
