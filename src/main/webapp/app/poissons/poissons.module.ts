import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoissonsComponent } from './poissons.component';

import { RouterModule } from '@angular/router';
import { AubSharedModule } from 'app/shared/shared.module';
import { poissonsRoute } from './poissons.route';

@NgModule({
  imports: [AubSharedModule, RouterModule.forChild([poissonsRoute])],
  declarations: [PoissonsComponent]
})
export class PoissonsModule {}
