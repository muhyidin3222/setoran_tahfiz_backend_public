import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadGatewayException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { dataConstants } from './auth.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const masterAdmin = roles?.find(
      (val) => val === dataConstants.master_admin,
    );
    const admin = roles?.find((val) => val === dataConstants.admin);
    const userRole = roles?.find((val) => val === dataConstants.user);
    const ustadz = roles?.find((val) => val === dataConstants.ustadz);

    // master admin
    if (masterAdmin && user?.type_user === dataConstants.master_admin) {
      return true;
    }

    // admin
    if (admin && user?.type_user === dataConstants.admin) {
      return true;
    }

    // user
    if (userRole && user?.type_user === dataConstants.user) {
      return true;
    }

    // ustadz
    if (ustadz && user?.type_user === dataConstants.ustadz) {
      return true;
    }

    throw new BadGatewayException('Not Have Access');
  }
}
