import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AubSharedModule } from 'app/shared/shared.module';
import { CommandesComponent } from './commandes.component';
import { CommandesDetailComponent } from './commandes-detail.component';
import { CommandesUpdateComponent } from './commandes-update.component';
import { CommandesDeletePopupComponent, CommandesDeleteDialogComponent } from './commandes-delete-dialog.component';
import { commandesRoute, commandesPopupRoute } from './commandes.route';

const ENTITY_STATES = [...commandesRoute, ...commandesPopupRoute];

@NgModule({
  imports: [AubSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CommandesComponent,
    CommandesDetailComponent,
    CommandesUpdateComponent,
    CommandesDeleteDialogComponent,
    CommandesDeletePopupComponent
  ],
  entryComponents: [CommandesComponent, CommandesUpdateComponent, CommandesDeleteDialogComponent, CommandesDeletePopupComponent]
})
export class AubCommandesModule {}
