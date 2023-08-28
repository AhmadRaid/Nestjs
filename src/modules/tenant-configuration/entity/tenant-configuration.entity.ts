import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';

@Entity('tenant-configuration')
@Index('idx_tenantconfig_tenantid', ['tenantId'])

export class TenantConfiguration {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'created_by', nullable: true })
  createdBy: string | null;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column({ name: 'setting_key' })
  settingKey: string;

  @Column({ name: 'setting_value' })
  settingValue: string;

  @Column({ name: 'tenant_id' })
  tenantId: number;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy: string | null;

  @Column()
  uuid: string;
}
