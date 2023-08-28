import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';

export class CreateTenantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  plan: string;

  // @IsNotEmpty()
  // @IsEnum(EnumTenantType)
  // type: EnumTenantType;

  @IsOptional()
  @IsString()
  domain: string | null;

  @IsOptional()
  @IsString()
  createdBy: string | null;

  @IsOptional()
  @IsString()
  updatedBy: string | null;
}
