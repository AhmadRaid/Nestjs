import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ description: 'The name of the company' })
  @IsNotEmpty({ message: 'Company name must not be empty' })
  @IsString({ message: 'Company name must be a string' })
  @MaxLength(255, { message: 'Company name is too long' })
  name: string;

  @ApiProperty({ description: 'The size of the company (optional)' })
  @IsOptional()
  @IsString({ message: 'Company size must be a string' })
  @MaxLength(50, { message: 'Company size is too long' })
  size?: string;
}
