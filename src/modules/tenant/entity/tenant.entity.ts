import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  Unique,
} from 'typeorm';

enum EnumTenantType { }
// Define your enum values here

@Entity('tenants')
@Index('idx_tenants_name', ['name'])
@Index('idx_tenants_domain', ['domain'])
@Unique('unique_domain', ['domain'])
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'created_by', nullable: true })
  createdBy: string | null;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column({ nullable: true })
  domain: string | null;

  @Column()
  name: string;

  @Column()
  plan: string;

  @Column()
  type: EnumTenantType;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy: string | null;

  @Column()
  uuid: string;
}
