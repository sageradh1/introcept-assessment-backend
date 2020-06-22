import { Student } from 'src/students/student.model';
import {
  Injectable,
  NotFoundException,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { StudentDTO } from 'src/students/dtos/student.dto';
import { GetStudentsDTO } from '../students/dtos/getstudent.dto';
import { StudentInterface } from '../students/interfaces/student.interface';

var fs = require('fs');
const readline = require('readline');

const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
// Helper functions for interacting with our csv file
export default class CustomDbModel {
  //Danger this overwrites the file and create a new one
  writeOrCreate(data: string) {
    fs.writeFile('source.csv', data + '\n', err => {
      if (err) throw err;
      console.log('Done');
    });
  }

  //For reading the whole file
  readFromFile() {
    const output = '';
    fs.readFile('source.csv', 'utf8', function(error, content) {
      if (error) {
        console.log(error);
        this.output = 'error';
      } else {
        this.output = content;
      }
    });
    return output;
  }

  //for appending a new line
  appendToFile(data: string): Boolean {
    try {
      var stream = fs.createWriteStream('source.csv', { flags: 'a' });
      stream.write(data + '\n');
      stream.end();
      return true;
    } catch {
      return false;
    }
  }

  //Adding new Student row
  async addStudentToFile(student: StudentDTO): Promise<Student> {
    var someEncryptedPass = '';

    bcrypt.hash(student.password, saltRounds, function(err, hash) {
      if (err) {
        new HttpException(
          'Problem while adding student',
          HttpStatus.NOT_IMPLEMENTED,
        );
      }

      if (hash) {
        const newstudent = new Student(
          student.name,
          student.gender,
          student.phone,
          student.email,
          student.nationality,
          student.dob,
          student.educationbackground,
          student.preferredmodeofcontact,
          new Date().getTime(),
          hash,
        ) as StudentInterface;

        Logger.log(newstudent);

        try {
          var stream = fs.createWriteStream('source.csv', { flags: 'a' });
          stream.write(JSON.stringify(newstudent) + '\n');
          stream.end();
        } catch {
          new HttpException(
            'Could not write to the file',
            HttpStatus.NOT_IMPLEMENTED,
          );
        }
      }
    });

    return new Student(
      student.name,
      student.gender,
      student.phone,
      student.email,
      student.nationality,
      student.dob,
      student.educationbackground,
      student.preferredmodeofcontact,
    );
  }

  //Get a list of students
  async getListOfStudents(
    getStudents: GetStudentsDTO,
  ): Promise<Array<Student>> {
    const fileStream = fs.createReadStream('source.csv');

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    var responseList = new Array<Student>();
    var count = 0;
    for await (const line of rl) {
      var currentStudent = JSON.parse(line);
      if (count < getStudents.numberOfStudents) {
        if (getStudents.refId <= currentStudent.id) {
          responseList[count] = currentStudent;
          count = count + 1;
        } else {
          continue;
        }
      } else {
        break;
      }
    }
    return responseList;
  }

  async getStudentById(id: number): Promise<Student> {
    const fileStream = fs.createReadStream('source.csv');

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      var currentStudent = JSON.parse(line);
      if (currentStudent.id == id) {
        return currentStudent;
      }
    }
    throw new NotFoundException();
  }

  async getStudentByEmail(email: string): Promise<Student> {
    const fileStream = fs.createReadStream('source.csv');

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      var currentStudent = JSON.parse(line);
      if (currentStudent.email == email) {
        return currentStudent;
      }
    }
    throw new NotFoundException();
  }
}
