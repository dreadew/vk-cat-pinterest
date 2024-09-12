import { Like } from 'src/like/entities/like.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  // идентификатор пользователя
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // логин пользователя
  @Column({ unique: true })
  login: string;

  // пароль пользователя
  @Column()
  password: string;

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
