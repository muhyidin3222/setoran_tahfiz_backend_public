import { ParamCreate, ParamUpdate } from './payment.dto';
import { PaymentEntity } from './payment.entity';
export declare class PaymentService {
    private paymentRepository;
    constructor(paymentRepository: typeof PaymentEntity);
    detailService(param: any): Promise<PaymentEntity>;
    getService(query: any): Promise<{
        rows: PaymentEntity[];
        count: number;
    }>;
    deleteService(id: number): Promise<PaymentEntity | any>;
    updateService(body: ParamUpdate | any): Promise<PaymentEntity>;
    createService(body: ParamCreate | any): Promise<PaymentEntity>;
}
