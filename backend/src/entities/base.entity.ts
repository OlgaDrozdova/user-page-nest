import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity as TypeOrmBaseEntity,
} from 'typeorm';

@Entity()
export abstract class EntityBase extends TypeOrmBaseEntity {
  constructor() {
    super();
    this.createdAt = new Date();
  }

  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  readonly id: string;

  @Column({
    type: 'timestamp with time zone',
    name: 'created_at',
    nullable: false,
  })
  readonly createdAt: Date;

  @Column({
    type: 'timestamp with time zone',
    name: 'deleted_at',
    nullable: true,
  })
  public deletedAt?: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    name: 'updated_at',
    nullable: true,
  })
  readonly updatedAt?: Date;
}
