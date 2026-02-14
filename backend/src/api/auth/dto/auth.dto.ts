import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class AuthDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsString({ message: 'Почта обязательно' })
  @IsEmail()
  email: string;

  @IsString({ message: 'Пароль обязателен' })
  @MinLength(6, { message: 'Минимальная длина пароля 6 символов' })
  password: string;
}