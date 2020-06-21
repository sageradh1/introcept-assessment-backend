import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './interfaces/student.interface';
import CustomDbModel from 'src/db/db.helper';
import { StudentDTO } from './dtos/student.dto';
import { CommonResponse } from '../shared/common-response.model';
import { GetStudentsDTO } from './dtos/getstudent.dto';

@Injectable()
export class StudentService {
  constructor(private readonly studentModel: CustomDbModel) {}

  private Students: Student[] = [];

  async getSingleStudent(
    StudentId: number,
    path: string,
    method: string,
    date: string,
  ): Promise<CommonResponse> {
    const student = await this.studentModel.getStudentById(StudentId);

    const response = new CommonResponse(
      path,
      method,
      200,
      'Success',
      date,
      student,
    );
    return response;
  }

  async insertStudent(
    student: StudentDTO,
    path: string,
    method: string,
    date: string,
  ): Promise<CommonResponse> {
    const newStudent = await this.studentModel.addStudentToFile(student);

    const response = new CommonResponse(
      path,
      method,
      200,
      'Success',
      date,
      newStudent,
    );
    return response;
  }

  async getStudents(
    reqbody: GetStudentsDTO,
    path: string,
    method: string,
    date: string,
  ): Promise<CommonResponse> {
    var students = [];
    try {
      students = await this.studentModel.getListOfStudents(reqbody);
      const response = new CommonResponse(
        path,
        method,
        200,
        'Success',
        date,
        students,
      );
      return response;
    } catch {
      throw new NotFoundException();
    }
  }

  async findByPayload(payload: any) {
    const { studentId } = payload;
    return await this.studentModel.getStudentById(studentId);
  }
}
