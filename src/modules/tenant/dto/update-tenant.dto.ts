import { IsString, IsOptional } from 'class-validator';
//import { EnumTenantType } from './path-to-your-enum'; // Update with the correct import path

export class UpdateTenantDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  plan: string;

  //   @IsOptional()
  //   @IsEnum(EnumTenantType)
  //   type: EnumTenantType;

  @IsOptional()
  @IsString()
  domain: string | null;

  @IsOptional()
  @IsString()
  updatedBy: string | null;
}
