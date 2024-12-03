import { ColumnGuidTransformer } from '@shared/infrastructure/database/transformers/column-guid.transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Guid } from '@shared/types/guid';

@Entity('News')
export class NewsDbEntity {
  @Generated('uuid')
  @PrimaryColumn({
    transformer: new ColumnGuidTransformer(),
    type: 'uuid',
    unique: true,
  })
  public id: Guid;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  public updatedAt: Date;

  @Column({ nullable: false, type: 'varchar' })
  public url: string;

  @Column({ nullable: false, type: 'varchar' })
  public title: string;
}
