import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoissonsComponent } from './poissons.component';

import { RouterModule } from '@angular/router';
import { AubSharedModule } from 'app/shared';
import { poissonsRoute } from './poissons.route';

@NgModule({
  declarations: [PoissonsComponent],
  imports: [AubSharedModule, RouterModule.forChild([poissonsRoute])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PoissonsModule {}
