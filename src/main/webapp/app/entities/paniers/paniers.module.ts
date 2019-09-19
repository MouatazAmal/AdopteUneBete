import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AubSharedModule } from 'app/shared/shared.module';
import { PaniersComponent } from './paniers.component';
import { PaniersDetailComponent } from './paniers-detail.component';
import { PaniersUpdateComponent } from './paniers-update.component';
import { PaniersDeletePopupComponent, PaniersDeleteDialogComponent } from './paniers-delete-dialog.component';
import { paniersRoute, paniersPopupRoute } from './paniers.route';

const ENTITY_STATES = [...paniersRoute, ...paniersPopupRoute];

@NgModule({
  imports: [AubSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PaniersComponent,
    PaniersDetailComponent,
    PaniersUpdateComponent,
    PaniersDeleteDialogComponent,
    PaniersDeletePopupComponent
  ],
  entryComponents: [PaniersComponent, PaniersUpdateComponent, PaniersDeleteDialogComponent, PaniersDeletePopupComponent]
})
export class AubPaniersModule {}
