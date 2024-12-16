import { AchievementService } from './achievement.service';
import { ParamCreate, ParamGet, ParamUpdate } from './achievement.dto';
import { UserEntity } from 'src/user/user.entity';
import { Response as Res } from 'express';
export declare class AchievementController {
    private achievementService;
    private userRepository;
    constructor(achievementService: AchievementService, userRepository: typeof UserEntity);
    get(query: ParamGet, request: any): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    getAdmin(query: ParamGet, request: any): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    create(body: ParamCreate, request: any): Promise<{
        status_code: any;
        status_message: any;
        total: any;
        data: any;
    }>;
    detail(query: ParamGet, param: any): Promise<{
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
    getSertifikat(id?: string, res?: Res): Promise<void>;
}
