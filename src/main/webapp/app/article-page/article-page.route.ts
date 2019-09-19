import { Route } from '@angular/router';

import { ArticlePageComponent } from './article-page.component';

export const articlePageRoute: Route = {
  path: 'articlePage/:id',
  component: ArticlePageComponent
};
