import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthUserDto {
  @IsString({
    message: 'Логин должен быть строкой',
  })
  @MinLength(4, {
    message: 'Длина логина должна быть больше 3 символов',
  })
  @MaxLength(16, {
    message: 'Длина логина может быть максимум 16 символов',
  })
  login: string;

  @IsString({
    message: 'Пароль должен быть строкой',
  })
  @MinLength(8, {
    message: 'Длина пароля должна быть больше 7 символов',
  })
  @MaxLength(16, {
    message: 'Длина пароля может быть максимум 16 символов',
  })
  password: string;
}
