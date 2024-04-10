import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserInterests {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'varchar2', length: 8168 })
  description: string;
}
