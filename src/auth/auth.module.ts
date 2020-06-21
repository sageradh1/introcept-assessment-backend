import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { StudentModule } from 'src/students/students.module';

@Module({
  imports: [StudentModule],
  controllers: [],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
