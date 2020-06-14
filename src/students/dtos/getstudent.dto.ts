import { IsInt } from 'class-validator';

// For request pattern from client side to server side
export class GetStudentsDTO {
    @IsInt()
    readonly refId: number;
    @IsInt()
    readonly numberOfStudents: number;
}