import { Entity, PrimaryGeneratedColumn, Column, Unique, Index } from 'typeorm';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity('companies')
@Unique(['name']) // Ensure uniqueness of company names
@Index('idx_company_name', ['name']) // Index for faster lookups
export class Company {
  @ApiProperty({ description: 'The unique identifier of the company' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The name of the company' })
  @Column()
  @IsNotEmpty({ message: 'Company name must not be empty' })
  @IsString({ message: 'Company name must be a string' })
  @MaxLength(255, { message: 'Company name is too long' })
  name: string;

  @ApiProperty({ description: 'The size of the company (optional)' })
  @Column({ nullable: true })
  @IsOptional()
  @IsString({ message: 'Company size must be a string' })
  @MaxLength(50, { message: 'Company size is too long' })
  size?: string;
}
