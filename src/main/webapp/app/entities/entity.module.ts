import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'utilisateurs',
        loadChildren: () => import('./utilisateurs/utilisateurs.module').then(m => m.AubUtilisateursModule)
      },
      {
        path: 'paniers',
        loadChildren: () => import('./paniers/paniers.module').then(m => m.AubPaniersModule)
      },
      {
        path: 'commandes',
        loadChildren: () => import('./commandes/commandes.module').then(m => m.AubCommandesModule)
      },
      {
        path: 'animaux',
        loadChildren: () => import('./animaux/animaux.module').then(m => m.AubAnimauxModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: []
})
export class AubEntityModule {}
