import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { autresRoute } from './autres.route';
import { AutresComponent } from './autres.component';
import { AubSharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [AubSharedModule, RouterModule.forChild([autresRoute])],
  declarations: [AutresComponent]
})
export class AutresModule {}
