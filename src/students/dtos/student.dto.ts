import { IsString, IsInt, IsEmail, IsOptional } from 'class-validator';

// For request pattern from client side to server side
export class StudentDTO {
  @IsString()
  readonly name: string;
  @IsString()
  readonly gender: string;
  @IsInt()
  readonly phone: number;
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly nationality: string;
  @IsString()
  readonly dob: string;
  @IsString()
  readonly educationbackground: string;
  @IsString()
  readonly preferredmodeofcontact: string;
  @IsString()
  readonly password: string;
  @IsOptional()
  readonly id: string;
}
