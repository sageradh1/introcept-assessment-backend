import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
  Req,
  UseGuards,
  Request,
  Logger,
} from '@nestjs/common';
import { StudentService } from './students.service';
import { StudentDTO } from './dtos/student.dto';
import { CommonResponse } from 'src/shared/common-response.model';
import { GetStudentsDTO } from './dtos/getstudent.dto';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';

// Controller for Student
@Controller('api/student')
export class StudentController {
  constructor(
    private readonly studentsService: StudentService,
    private readonly authService: AuthService,
  ) {}

  //#region
  @Post()
  addStudent(@Body() reqbody: StudentDTO, @Req() req): Promise<CommonResponse> {
    return this.studentsService.insertStudent(
      reqbody,
      req.url,
      req.method,
      new Date().toISOString(),
    );
  }

  //for endpoint (api/student/all)
  @Post('all')
  getAllStudents(
    @Body() reqbody: GetStudentsDTO,
    @Req() req,
  ): Promise<CommonResponse> {
    return this.studentsService.getStudents(
      reqbody,
      req.url,
      req.method,
      new Date().toISOString(),
    );
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<CommonResponse> {
    return this.authService.login(
      req.user,
      req.url,
      req.method,
      new Date().toISOString(),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): CommonResponse {
    const myResponse = new CommonResponse(
      req.url,
      req.method,
      200,
      'Success',
      new Date().toISOString(),
      req.user,
    );
    return myResponse;
  }

  @Get(':id')
  getStudent(@Param('id') studentId: number, @Req() req) {
    return this.studentsService
      .getSingleStudent(
        studentId,
        req.url,
        req.method,
        new Date().toISOString(),
      )
      .then(result => {
        if (result) {
          return result;
        } else {
          throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }
      })
      .catch(() => {
        throw new HttpException(
          'Student not found catch',
          HttpStatus.NOT_FOUND,
        );
      });
  }

  @Patch(':id')
  updateStudent(@Param('id') prodId: string, @Body() reqbody: StudentDTO) {
    // TODO : for future
    return 'update';
  }

  @Delete(':id')
  removeStudent(@Param('id') prodId: string) {
    // TODO : for future
    return 'delete';
  }
}
