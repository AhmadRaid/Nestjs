import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTenantConfigurationDto {
    @IsNotEmpty({ message: 'Setting key must not be empty' })
    @IsString({ message: 'Setting key must be a string' })
    @MaxLength(255, { message: 'Setting key is too long' })
    settingKey: string;

    @IsNotEmpty({ message: 'Setting value must not be empty' })
    @IsString({ message: 'Setting value must be a string' })
    @MaxLength(255, { message: 'Setting value is too long' })
    settingValue: string;

    @IsNotEmpty({ message: 'Tenant ID must not be empty' })
    @IsNumber({}, { message: 'Tenant ID must be a number' })
    tenantId: number;
}

