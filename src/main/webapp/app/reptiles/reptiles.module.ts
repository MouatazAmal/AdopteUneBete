import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReptilesComponent } from './reptiles.component';

import { RouterModule } from '@angular/router';
import { AubSharedModule } from 'app/shared';
import { reptilesRoute } from './reptiles.route';

@NgModule({
  declarations: [ReptilesComponent],
  imports: [AubSharedModule, RouterModule.forChild([reptilesRoute])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReptilesModule {}
