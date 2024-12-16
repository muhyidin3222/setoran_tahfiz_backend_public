import { UnauthorizedException, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class ValidationTokenApp {
  private googleClientId =
    '692802393188-pasejq37kukb4me4oo6j2470abol21li.apps.googleusercontent.com';

  async validateTokenGoogle(clientToken) {
    try {
      const client = new OAuth2Client(this.googleClientId);
      const ticket = await client.verifyIdToken({
        idToken: clientToken,
        // audience: this.googleClientId,
      });
      const payload = ticket.getPayload();
      return payload;
    } catch (error) {
      // console.log(error, clientToken, 'Invalid tokenApp');
      throw new UnauthorizedException('Invalid tokenApp');
    }
  }
}
