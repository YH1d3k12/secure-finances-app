import { Type } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsEmail({}, { message: 'Email deve ser válido' })
    @Type(() => String)
    email: string;

    @IsString({ message: 'Senha deve ser uma string' })
    @MinLength(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
    @Type(() => String)
    password: string;

    @IsString({ message: 'Nome deve ser uma string' })
    @MinLength(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
    @Type(() => String)
    name: string;
}

export class LoginDto {
    @IsEmail({}, { message: 'Email deve ser válido' })
    @Type(() => String)
    email: string;

    @IsString({ message: 'Senha deve ser uma string' })
    @Type(() => String)
    password: string;
}
