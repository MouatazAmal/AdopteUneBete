import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierComponent } from './panier.component';

import { RouterModule } from '@angular/router';
import { AubSharedModule } from 'app/shared';
import { panierRoute } from './panier.route';

@NgModule({
  declarations: [PanierComponent],
  imports: [AubSharedModule, RouterModule.forChild([panierRoute])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PanierModule {}
