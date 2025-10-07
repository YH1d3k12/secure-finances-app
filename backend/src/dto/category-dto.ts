import { IsString, MinLength, IsOptional } from 'class-validator';

export class CreateCategoryDto {
    @IsString({ message: 'Nome deve ser uma string' })
    @MinLength(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
    name: string;

    @IsOptional()
    @IsString({ message: 'Descrição deve ser uma string' })
    description?: string;
}

export class UpdateCategoryDto {
    @IsOptional()
    @IsString({ message: 'Nome deve ser uma string' })
    @MinLength(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
    name?: string;

    @IsOptional()
    @IsString({ message: 'Descrição deve ser uma string' })
    description?: string;
}
