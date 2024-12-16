import { LogsEntity } from './logs.entity';
export declare class LogsService {
    private logsRepository;
    constructor(logsRepository: typeof LogsEntity);
    createService(body: LogsEntity | any): Promise<LogsEntity>;
}
