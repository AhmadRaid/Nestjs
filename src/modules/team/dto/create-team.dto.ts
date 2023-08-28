import {
    IsEmail,
    IsString,
    MinLength,
    IsNotEmpty,
    IsOptional,
} from 'class-validator';

export class CreateTeamDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @IsNotEmpty()
    roles: string[];

    @IsString()
    @IsNotEmpty()
    username: string;
}
