import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTenantConfigurationDto {
    @IsOptional()
    @IsString({ message: 'Setting key must be a string' })
    @MaxLength(255, { message: 'Setting key is too long' })
    settingKey?: string;

    @IsOptional()
    @IsString({ message: 'Setting value must be a string' })
    @MaxLength(255, { message: 'Setting value is too long' })
    settingValue?: string;
}
