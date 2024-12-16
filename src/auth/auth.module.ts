import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { ValidationTokenApp } from '../common/library/validation-token.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '../common/library/config.module';
import { RolesGuard } from './roles.guard';
import {
  admin_user_provider,
  student_provider,
  user_provider,
} from 'src/common/provider/master-provider-model';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    ValidationTokenApp,
    RolesGuard,
    user_provider,
    admin_user_provider,
    student_provider,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
