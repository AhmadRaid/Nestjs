import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Unique,
} from 'typeorm';

@Entity('tenant_types')
@Unique('unique_tenant_type', ['platform', 'code'])
export class TenantType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'created_by', nullable: true })
  createdBy: string | null;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column()
  name: string;

  @Column()
  platform: string;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy: string | null;
}
