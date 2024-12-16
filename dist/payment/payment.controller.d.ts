import { PaymentService } from './payment.service';
import { ParamCreate, ParamGet, ParamUpdate } from './payment.dto';
export declare class PaymentController {
    private paymentService;
    constructor(paymentService: PaymentService);
    get(query: ParamGet): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    create(body: ParamCreate): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    update(body: ParamUpdate): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    delete(id: number): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    detail(param: any): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
}
