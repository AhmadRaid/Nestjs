import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyDto {
  @ApiProperty({ description: 'The new name of the company (optional)' })
  @IsOptional()
  @IsString({ message: 'Company name must be a string' })
  @MaxLength(255, { message: 'Company name is too long' })
  name?: string;

  @ApiProperty({ description: 'The new size of the company (optional)' })
  @IsOptional()
  @IsString({ message: 'Company size must be a string' })
  @MaxLength(50, { message: 'Company size is too long' })
  size?: string;
}
