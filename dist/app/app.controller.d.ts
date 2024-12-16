import { AppService } from './app.service';
import { ConfigService } from 'src/common/library/config.service';
export declare class AppController {
    private readonly appService;
    private readonly configService;
    constructor(appService: AppService, configService: ConfigService);
    main(): string;
    sendEmail(): Promise<string>;
    home(): Promise<any>;
    subscribeTopi(request: any): Promise<any>;
    uploadedFile(file: any): Promise<{
        originalname: any;
        filename: any;
        url: string;
    }>;
    seeUploadedFile(image: any, res: any): any;
    homeChart(request: any): Promise<any>;
}
