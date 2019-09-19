import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToutlesproduitsComponent } from './toutlesproduits.component';

import { RouterModule } from '@angular/router';
import { AubSharedModule } from 'app/shared/shared.module';
import { toutlesproduitsRoute } from './toutlesproduits.route';

@NgModule({
  imports: [AubSharedModule, RouterModule.forChild([toutlesproduitsRoute])],
  declarations: [ToutlesproduitsComponent]
})
export class ToutlesproduitsModule {}
