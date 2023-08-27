import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsNotEmpty()
  roles: string[];

  @IsString()
  @IsNotEmpty()
  username: string;
}
