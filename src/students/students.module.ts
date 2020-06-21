import { Module } from '@nestjs/common';

import { StudentController } from './students.controller';
import { StudentService } from './students.service';
import CustomDbModel from '../db/db.helper';

@Module({
  imports: [],
  controllers: [StudentController],
  providers: [StudentService, CustomDbModel],
  exports: [StudentService],
})
export class StudentModule {}
