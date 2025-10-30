import { Type } from 'class-transformer';
import { IsString, MinLength, IsOptional } from 'class-validator';

export class CreateCategoryDto {
    @IsString({ message: 'Nome deve ser uma string' })
    @MinLength(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
    @Type(() => String)
    name: string;

    @IsOptional()
    @IsString({ message: 'Descrição deve ser uma string' })
    @Type(() => String)
    description?: string;
}

export class UpdateCategoryDto {
    @IsOptional()
    @IsString({ message: 'Nome deve ser uma string' })
    @MinLength(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
    @Type(() => String)
    name?: string;

    @IsOptional()
    @IsString({ message: 'Descrição deve ser uma string' })
    @Type(() => String)
    description?: string;
}
