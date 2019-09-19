import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {AubSharedModule} from "app/shared/shared.module";
import { nouveautesRoute } from './nouveautes.route';
import { NouveautesComponent } from './nouveautes.component';
import { ArticleComponent } from 'app/article/article.component';

@NgModule({
  declarations: [NouveautesComponent],
  imports: [AubSharedModule, RouterModule.forChild([nouveautesRoute])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NouveautesModule {}
