import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AubSharedModule } from 'app/shared';
import { felinsRoute } from './felins.route';
import { FelinsComponent } from './felins.component';

@NgModule({
  declarations: [FelinsComponent],
  imports: [AubSharedModule, RouterModule.forChild([felinsRoute])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FelinsModule {}
