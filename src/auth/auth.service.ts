import { Injectable, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { StudentService } from 'src/students/students.service';
import { JwtService } from '@nestjs/jwt';
import { CommonResponse } from 'src/shared/common-response.model';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly studentService: StudentService,
  ) {}

  async validateUser(payload: any) {
    const student = await this.studentService.findByPayload(payload);
    const isPasswordMatching = await bcrypt.compare(
      payload.password,
      student.hashed_password,
    );
    if (student && isPasswordMatching) {
      const { hashed_password, ...result } = student;
      return result;
    }
    return null;
  }

  async validateUserByEmail(payload: any) {
    const student = await this.studentService.findByPayload(payload);
    if (student) {
      const { hashed_password, ...result } = student;
      return result;
    }
    return null;
  }

  async login(user: any, url: string, method: string, date: string) {
    const payload = { email: user.email };

    const data = {
      user: user,
      access_token: this.jwtService.sign(payload),
    };
    const myResponse = new CommonResponse(
      url,
      method,
      200,
      'Success',
      date,
      data,
    );
    return myResponse;
  }
}
