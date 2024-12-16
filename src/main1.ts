import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from 'src/common/library/http-exception.filter';
import { JoinValidationPipe } from 'src/common/library/validation.pipe';
import { ConfigService } from 'src/common/library/config.service';
import { runInCluster } from './common/library/runInCluster';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import featurePolicy from 'feature-policy';

const allowedOrigins = [
  'http://localhost:3006',
  'http://localhost:3007',
  'https://setoran-tahfidz-cms.aplikasipileg.com',
];

async function bootstrap() {
  const configService = new ConfigService();
  const port: any = configService.get('PORT');
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new JoinValidationPipe());
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });
  app.use(cookieParser());
  app.use(
    helmet({
      crossOriginResourcePolicy: {
        policy: 'cross-origin',
      },
    }),
  );
  app.use(
    featurePolicy({
      features: {
        fullscreen: ["'self'"],
        vibrate: ["'none'"],
        syncXhr: ["'none'"],
      },
    }),
  );

  await app.listen(port);
}

runInCluster(bootstrap);
