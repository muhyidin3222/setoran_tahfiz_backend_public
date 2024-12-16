import * as cluster from 'cluster';
import * as os from 'os';
import { ConfigService } from 'src/common/library/config.service';

export function runInCluster(bootstrap: () => Promise<void>) {
  const configService = new ConfigService();
  const env: any = configService.get('ENV');
  if (env === 'production') {
    if (cluster.isMaster) {
      const numberOfCores = os.cpus().length;
      for (let i = 0; i < numberOfCores; ++i) {
        cluster.fork();
      }
    } else {
      bootstrap();
    }
  } else {
    bootstrap();
  }
}
