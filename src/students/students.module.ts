import { Module } from '@nestjs/common';

import { StudentController } from './students.controller';
import { StudentService } from './students.service';
import CustomDbModel from '../db/db.helper';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/auth.constants';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [StudentController],
  providers: [StudentService, CustomDbModel, AuthService],
  exports: [StudentService],
})
export class StudentModule {}
