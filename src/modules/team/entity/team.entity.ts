import { Entity, PrimaryGeneratedColumn, Column, Unique, Index } from 'typeorm';
import { IsEmail, IsOptional, IsString } from 'class-validator';

@Entity('users')
@Unique(['email', 'username'])
@Index('idx_email', ['email'])
@Index('idx_username', ['username'])
export class Team {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    @IsString()
    @IsOptional()
    firstName: string;

    @Column({ nullable: true })
    @IsString()
    @IsOptional()
    lastName: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    password: string;

    @Column({ nullable: true })
    @IsString()
    @IsOptional()
    phoneNumber: string;

    @Column({ unique: true })
    @IsString()
    username: string;

    @IsString({ each: true })
    roles: string[];
}
