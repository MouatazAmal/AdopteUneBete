import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AubSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

import { ArticleComponent } from 'app/article/article.component';

@NgModule({
  imports: [AubSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class AubHomeModule {}
