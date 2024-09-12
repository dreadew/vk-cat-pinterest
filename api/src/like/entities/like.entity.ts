import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Like {
  @PrimaryColumn()
  catId: string;

  @Column()
  url: string;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
