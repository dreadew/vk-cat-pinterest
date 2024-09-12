import { IsString } from 'class-validator';

export class AddLikeDto {
  @IsString({ message: 'Идентификатор кота должен быть строкой' })
  catId: string;

  @IsString({ message: 'URL кота должен быть строкой' })
  url: string;
}
