import { PeriodEntity } from './period.entity';
import { ParamCreate, ParamUpdate } from './school.dto';
import { SchoolEntity } from './school.entity';
export declare class SchoolService {
    private schoolRepository;
    private periodRepository;
    constructor(schoolRepository: typeof SchoolEntity, periodRepository: typeof PeriodEntity);
    detailService(param: any): Promise<SchoolEntity>;
    getService(query: any): Promise<{
        rows: SchoolEntity[];
        count: number;
    }>;
    deleteService(id: number): Promise<SchoolEntity | any>;
    updateService(body: ParamUpdate | any): Promise<SchoolEntity>;
    createService(body: ParamCreate | any): Promise<SchoolEntity>;
    detailPeriodService(param: any): Promise<PeriodEntity>;
    getPeriodService(query: any): Promise<{
        rows: PeriodEntity[];
        count: number;
    }>;
    deletePeriodService(id: number): Promise<PeriodEntity | any>;
    updatePeriodService(body: ParamUpdate | any): Promise<PeriodEntity>;
    createPeriodService(body: ParamCreate | any): Promise<PeriodEntity>;
}
