import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierComponent } from './panier.component';

import { RouterModule } from '@angular/router';
import { AubSharedModule } from 'app/shared/shared.module';
import { panierRoute } from './panier.route';

@NgModule({
  imports: [AubSharedModule, RouterModule.forChild([panierRoute])],
  declarations: [PanierComponent]
})
export class PanierModule {}
