import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserInterests } from './Interests';
import { Profile } from './Profile';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ name: 'string', length: 100, type: 'varchar' })
  name: string;

  @Column({ name: 'username', length: 100, type: 'varchar', unique: true })
  username: string;

  @Column({ name: 'email', length: 100, type: 'varchar', unique: true })
  email: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column()
  createdAt: Date;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  // @ManyToMany(() => UserInterests)
  // @JoinTable()
  // interests: UserInterests[];
}
