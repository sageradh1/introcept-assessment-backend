import { Controller,Post,Body,Get,Param,Patch,Delete, HttpException, HttpStatus, Req} from '@nestjs/common';
import { StudentService } from './students.service';
import { StudentDTO } from './dtos/student.dto';
import { CommonResponse } from 'src/shared/common-response.model';
import { GetStudentsDTO } from './dtos/getstudent.dto';


// Controller for Student
@Controller('api/student')
export class StudentController {
    constructor(private readonly studentsService: StudentService) {}

    //#region 
    @Post()
    addStudent(@Body() reqbody : StudentDTO, @Req() req) : Promise<CommonResponse>{
        
        return this.studentsService.insertStudent(
            reqbody,req.url, req.method,new Date().toISOString()
        )
    }

    //for endpoint (api/student/all)
    @Post('all')
    getAllStudents(@Body() reqbody : GetStudentsDTO, @Req() req) : Promise<CommonResponse>{
        return this.studentsService.getStudents(reqbody,req.url, req.method,new Date().toISOString());
    }

    @Get(':id')
    getStudent(
        @Param('id') studentId: number,@Req() req
        ) {
            return this.studentsService.getSingleStudent(studentId,req.url, req.method,new Date().toISOString())
        .then(
            (result)=>{
                if (result){
                    return result;
                }else {
                    throw new HttpException('Student not found',HttpStatus.NOT_FOUND)
                }
            }
        )
        .catch(
            ()=>{
                throw new HttpException('Student not found catch',HttpStatus.NOT_FOUND)
            }
        );
    }

    @Patch(':id')
    updateStudent(
        @Param('id') prodId: string,
        @Body() reqbody : StudentDTO,
   
    ) {
        // TODO : for future 
        return "update"
    }

    @Delete(':id')
    removeStudent(
        @Param('id') prodId: string
        ) {
        // TODO : for future 
        return "delete"
    }
    //#endregion
}
