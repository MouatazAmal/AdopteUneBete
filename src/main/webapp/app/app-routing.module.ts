import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { nouveautesRoute } from './nouveautes/nouveautes.route';
import { toutlesproduitsRoute } from './toutlesproduits/toutlesproduits.route';
import { poissonsRoute } from './poissons/poissons.route';
import { reptilesRoute } from './reptiles/reptiles.route';
import { felinsRoute } from './felins/felins.route';
import { autresRoute } from './autres/autres.route';
import { panierRoute } from './panier/panier.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { navbarRoute } from 'app/layouts/navbar/navbar.route';
import { errorRoute } from 'app/layouts/error/error.route';
import { articleRoute } from 'app/article/article.route';
import { articlePageRoute } from 'app/article-page/article-page.route';

const LAYOUT_ROUTES = [
  navbarRoute,
  articleRoute,
  articlePageRoute,
  nouveautesRoute,
  toutlesproduitsRoute,
  poissonsRoute,
  reptilesRoute,
  felinsRoute,
  autresRoute,
  panierRoute,
  ...errorRoute
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          loadChildren: () => import('./admin/admin.module').then(m => m.AubAdminModule)
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AubAccountModule)
        },
        ...LAYOUT_ROUTES
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class AubAppRoutingModule {}
