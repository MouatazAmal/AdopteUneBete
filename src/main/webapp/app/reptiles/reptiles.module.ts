import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReptilesComponent } from './reptiles.component';

import { RouterModule } from '@angular/router';
import { AubSharedModule } from 'app/shared/shared.module';
import { reptilesRoute } from './reptiles.route';

@NgModule({
  imports: [AubSharedModule, RouterModule.forChild([reptilesRoute])],
  declarations: [ReptilesComponent]
})
export class ReptilesModule {}
