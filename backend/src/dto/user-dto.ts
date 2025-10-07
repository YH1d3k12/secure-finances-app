import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsEmail({}, { message: 'Email deve ser válido' })
    email: string;

    @IsString({ message: 'Senha deve ser uma string' })
    @MinLength(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
    password: string;

    @IsString({ message: 'Nome deve ser uma string' })
    @MinLength(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
    name: string;
}

export class LoginDto {
    @IsEmail({}, { message: 'Email deve ser válido' })
    email: string;

    @IsString({ message: 'Senha deve ser uma string' })
    password: string;
}
