import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AubSharedModule } from 'app/shared';
import { autresRoute } from './autres.route';
import { AutresComponent } from './autres.component';

@NgModule({
  declarations: [AutresComponent],
  imports: [AubSharedModule, RouterModule.forChild([autresRoute])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AutresModule {}
