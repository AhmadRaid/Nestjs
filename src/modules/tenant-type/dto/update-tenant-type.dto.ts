import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';

export class UpdateTenantTypeDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  code: string;

  @IsOptional()
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
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  platform: string;

  @IsOptional()
  @IsDate()
  updatedAt: Date | null;

  @IsOptional()
  @IsString()
  updatedBy: string | null;
}
