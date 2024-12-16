import { ConfigEntity } from 'src/config/config.entity';
import { UserEntity } from 'src/user/user.entity';
import { UserSetoranEntity } from 'src/setoran-tahfidz/user-setoran.entity';
export declare class AppService {
    private configRepository;
    private userRepository;
    private userSetoranRepository;
    constructor(configRepository: typeof ConfigEntity, userRepository: typeof UserEntity, userSetoranRepository: typeof UserSetoranEntity);
    main(): string;
    home(): Promise<any>;
    subscribe(id: any): Promise<any>;
    homeChart(id_school: number): Promise<any>;
}
