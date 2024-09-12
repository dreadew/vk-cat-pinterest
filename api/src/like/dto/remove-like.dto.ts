import { IsString } from 'class-validator';

export class RemoveLikeDto {
  @IsString({ message: 'Идентификатор кота должен быть строкой' })
  catId: string;

  @IsString({ message: 'Идентификатор пользователя должен быть строкой' })
  userId: string;
}
