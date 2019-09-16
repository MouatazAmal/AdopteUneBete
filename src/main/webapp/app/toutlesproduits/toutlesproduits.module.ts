import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToutlesproduitsComponent } from './toutlesproduits.component';

import { RouterModule } from '@angular/router';
import { AubSharedModule } from 'app/shared';
import { toutlesproduitsRoute } from './toutlesproduits.route';

@NgModule({
  declarations: [ToutlesproduitsComponent],
  imports: [AubSharedModule, RouterModule.forChild([toutlesproduitsRoute])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ToutlesproduitsModule {}
