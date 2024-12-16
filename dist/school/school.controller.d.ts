import { SchoolService } from './school.service';
import { ParamCreate, ParamGet, ParamUpdate } from './school.dto';
export declare class SchoolController {
    private schoolService;
    constructor(schoolService: SchoolService);
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
    getPeriod(query: ParamGet): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    createPeriod(body: ParamCreate): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    updatePeriod(body: ParamUpdate): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    deletePeriod(id: number): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    detailPeriod(param: any): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
}
