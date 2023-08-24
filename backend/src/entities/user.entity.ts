import { Column, Entity } from 'typeorm';
import { EntityBase } from './base.entity';

@Entity('users')
export class UserEntity extends EntityBase {
  @Column({ type: 'varchar', name: 'email', nullable: false })
  public email: string;

  @Column({ type: 'varchar', name: 'password', nullable: false })
  public password: string;

  @Column({ type: 'varchar', name: 'name', nullable: true })
  public name: string;

  @Column({ type: 'varchar', name: 'surname', nullable: true })
  public surname: string;
}
