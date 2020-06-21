import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authservice: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrkey: 'secretKey',
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    // // TODO obviously the password will be stored in crypted form
    // const { phone } = payload;
    // const student = await this.studentService.findByPayload(payload);

    // if (student && student.phone === phone) {
    //   const { phone, ...result } = student;
    //   return result;
    // }
    // return null;

    const user = await this.authservice.validateUser(payload);

    if (!user) {
      return done(
        new HttpException('Unauthorised access', HttpStatus.UNAUTHORIZED),
        false,
      );
    }
    return done(null, user, payload.iat);
  }
}
