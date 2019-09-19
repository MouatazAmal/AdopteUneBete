import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AubSharedModule } from 'app/shared/shared.module';
import { AnimauxComponent } from './animaux.component';
import { AnimauxDetailComponent } from './animaux-detail.component';
import { AnimauxUpdateComponent } from './animaux-update.component';
import { AnimauxDeletePopupComponent, AnimauxDeleteDialogComponent } from './animaux-delete-dialog.component';
import { animauxRoute, animauxPopupRoute } from './animaux.route';

const ENTITY_STATES = [...animauxRoute, ...animauxPopupRoute];

@NgModule({
  imports: [AubSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AnimauxComponent,
    AnimauxDetailComponent,
    AnimauxUpdateComponent,
    AnimauxDeleteDialogComponent,
    AnimauxDeletePopupComponent
  ],
  entryComponents: [AnimauxComponent, AnimauxUpdateComponent, AnimauxDeleteDialogComponent, AnimauxDeletePopupComponent]
})
export class AubAnimauxModule {}
