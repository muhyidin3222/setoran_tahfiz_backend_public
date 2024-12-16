import { Inject, Injectable } from '@nestjs/common';
import { payment_provider } from 'src/common/provider/master-provider-model';
import { ParamCreate, ParamUpdate } from './payment.dto';
import { PaymentEntity } from './payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(payment_provider.provide)
    private paymentRepository: typeof PaymentEntity,
  ) {}

  async detailService(param: any): Promise<PaymentEntity> {
    const resFindSeller = await this.paymentRepository.findOne(param);
    return resFindSeller;
  }

  async getService(
    query: any,
  ): Promise<{ rows: PaymentEntity[]; count: number }> {
    const resFindSeller = await this.paymentRepository.findAndCountAll({
      ...query,
      attributes: ['id', 'title', 'image', 'description', 'created_at'],
      order: [['created_at', 'DESC']],
      // include: [
      //   {
      //     model: TagEntity,
      //     attributes: ['id', 'name', 'color'],
      //   },
      // ],
    });
    return resFindSeller;
  }

  async deleteService(id: number): Promise<PaymentEntity | any> {
    const resFindSeller = await this.paymentRepository.destroy({
      where: {
        id,
      },
    });
    return resFindSeller;
  }

  async updateService(body: ParamUpdate | any): Promise<PaymentEntity> {
    await this.paymentRepository.update(body, {
      where: {
        id: body?.id,
      },
    });
    return body;
  }

  async createService(body: ParamCreate | any): Promise<PaymentEntity> {
    const resCreated = await this.paymentRepository.create(body);
    return resCreated;
  }
}
