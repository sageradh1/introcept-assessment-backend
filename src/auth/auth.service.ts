import { Injectable } from '@nestjs/common';
import { StudentService } from 'src/students/students.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private studentService: StudentService,
    private jwtService: JwtService,
  ) {}

  // async signPayLoad(payload: any) {
  //   return sign(payload, 'secretKey', { expiresIn: '2d' });
  // }

  async validateUser(payload: any) {
    // TODO the password will be stored in crypted form
    return await this.studentService.findByPayload(payload);
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
