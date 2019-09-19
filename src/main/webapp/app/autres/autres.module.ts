import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { autresRoute } from './autres.route';
import { AutresComponent } from './autres.component';
import {AubSharedModule} from "app/shared/shared.module";

@NgModule({
  declarations: [AutresComponent],
  imports: [AubSharedModule, RouterModule.forChild([autresRoute])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AutresModule {}
