import { NotificationService } from 'src/notification/notification.service';
import { ParamCreate, ParamUpdate } from './berita.dto';
import { BeritaEntity } from './berita.entity';
export declare class BeritaService {
    private beritaRepository;
    private notificationService;
    constructor(beritaRepository: typeof BeritaEntity, notificationService: NotificationService);
    detailService(param: any): Promise<BeritaEntity>;
    getService(query: any): Promise<{
        rows: BeritaEntity[];
        count: number;
    }>;
    deleteService(where: any): Promise<BeritaEntity | any>;
    updateService(body: ParamUpdate | any): Promise<BeritaEntity>;
    updateAdminService(body: ParamUpdate | any, where: any): Promise<BeritaEntity>;
    createService(body: ParamCreate | any): Promise<BeritaEntity>;
}
