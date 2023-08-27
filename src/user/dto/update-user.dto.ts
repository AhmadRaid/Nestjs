// user.dto.ts
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  roles: any; // Use a proper type for roles (e.g., string[] or object)

  @IsString()
  username: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  // Add other fields you want to update

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  roles?: any; // Use a proper type for roles (e.g., string[] or object)

  // Add other fields you want to update
}
