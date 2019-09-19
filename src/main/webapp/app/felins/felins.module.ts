import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { felinsRoute } from './felins.route';
import { FelinsComponent } from './felins.component';
import {AubSharedModule} from "app/shared/shared.module";

@NgModule({
  declarations: [FelinsComponent],
  imports: [AubSharedModule, RouterModule.forChild([felinsRoute])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FelinsModule {}
