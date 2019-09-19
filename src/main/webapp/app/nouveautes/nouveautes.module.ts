import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AubSharedModule } from 'app/shared/shared.module';
import { nouveautesRoute } from './nouveautes.route';

@NgModule({
  imports: [AubSharedModule, RouterModule.forChild([nouveautesRoute])],
  declarations: []
})
export class NouveautesModule {}
