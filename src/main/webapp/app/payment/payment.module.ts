import { NgModule } from '@angular/core';
import { PaymentComponent } from './payment.component';

import { RouterModule } from '@angular/router';
import { AubSharedModule } from 'app/shared/shared.module';
import { paymentRoute } from './payment.route';

@NgModule({
  imports: [AubSharedModule, RouterModule.forChild([paymentRoute])],
  declarations: [PaymentComponent]
})
export class PaymentModule {}