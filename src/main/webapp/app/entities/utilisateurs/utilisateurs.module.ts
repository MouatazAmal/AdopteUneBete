import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AubSharedModule } from 'app/shared/shared.module';
import { UtilisateursComponent } from './utilisateurs.component';
import { UtilisateursDetailComponent } from './utilisateurs-detail.component';
import { UtilisateursUpdateComponent } from './utilisateurs-update.component';
import { UtilisateursDeletePopupComponent, UtilisateursDeleteDialogComponent } from './utilisateurs-delete-dialog.component';
import { utilisateursRoute, utilisateursPopupRoute } from './utilisateurs.route';

const ENTITY_STATES = [...utilisateursRoute, ...utilisateursPopupRoute];

@NgModule({
  imports: [AubSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    UtilisateursComponent,
    UtilisateursDetailComponent,
    UtilisateursUpdateComponent,
    UtilisateursDeleteDialogComponent,
    UtilisateursDeletePopupComponent
  ],
  entryComponents: [UtilisateursComponent, UtilisateursUpdateComponent, UtilisateursDeleteDialogComponent, UtilisateursDeletePopupComponent]
})
export class AubUtilisateursModule {}
