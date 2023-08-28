import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';

export class CreateTenantTypeDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsString()
  createdBy: string | null;

  @IsOptional()
  @IsDate()
  deletedAt: Date | null;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  platform: string;

  @IsOptional()
  @IsDate()
  updatedAt: Date | null;

  @IsOptional()
  @IsString()
  updatedBy: string | null;
}
