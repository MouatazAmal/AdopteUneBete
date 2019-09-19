import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { felinsRoute } from './felins.route';
import { FelinsComponent } from './felins.component';
import { AubSharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [AubSharedModule, RouterModule.forChild([felinsRoute])],
  declarations: [FelinsComponent]
})
export class FelinsModule {}
