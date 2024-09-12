import { IsString } from 'class-validator';

export class FindLikeByUserDto {
  @IsString({ message: 'Идентификатор пользователя должен быть строкой' })
  userId: string;
}
