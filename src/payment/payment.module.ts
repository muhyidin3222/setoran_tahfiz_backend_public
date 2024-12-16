import { Module } from '@nestjs/common';
import {
  payment_provider,
  user_provider,
} from 'src/common/provider/master-provider-model';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [],
  providers: [PaymentService, payment_provider, user_provider],
  exports: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
