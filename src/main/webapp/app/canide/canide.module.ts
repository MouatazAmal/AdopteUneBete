import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AubSharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { canideRoute } from './canide.route';
import { CanideComponent } from './canide.component';



@NgModule({
  imports: [AubSharedModule, RouterModule.forChild([canideRoute])],
  declarations: [
    CanideComponent
  ]
})
export class CanideModule { }
