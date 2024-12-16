import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from 'src/common/library/config.service';
import { ConfigModule } from 'src/common/library/config.module';
export declare const databaseProviders: {
    provide: string;
    imports: (typeof ConfigModule)[];
    inject: (typeof ConfigService)[];
    useFactory: (configService: ConfigService) => Promise<Sequelize>;
}[];
