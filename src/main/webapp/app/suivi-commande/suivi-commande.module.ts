import { NgModule } from '@angular/core';;
import { SuiviCommandeComponent } from './suivi-commande.component';

import { RouterModule } from '@angular/router';
import { AubSharedModule } from 'app/shared/shared.module';
import { SuiviCommandeRoute } from './suivi-commande.route';

@NgModule({
  imports: [AubSharedModule, RouterModule.forChild([SuiviCommandeRoute])],
  declarations: [SuiviCommandeComponent]
})
export class SuiviCommandeModule {}