import { Student } from 'src/students/student.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentDTO } from 'src/students/dtos/student.dto';
import { GetStudentsDTO } from '../students/dtos/getstudent.dto';

var fs = require('fs');
const readline = require('readline');

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
    const newstudent = new Student(
      new Date().getTime(),
      student.name,
      student.gender,
      student.phone,
      student.email,
      student.nationality,
      student.dob,
      student.educationbackground,
      student.preferredmodeofcontact,
    );
    this.appendToFile(JSON.stringify(newstudent));
    return new Student(
      newstudent.id,
      newstudent.name,
      newstudent.gender,
      newstudent.phone,
      newstudent.email,
      newstudent.nationality,
      newstudent.dob,
      newstudent.educationbackground,
      newstudent.preferredmodeofcontact,
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
}
