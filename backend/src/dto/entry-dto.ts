import {
    IsString,
    IsNumber,
    IsEnum,
    IsDateString,
    IsOptional,
    Min,
} from 'class-validator';
import { EntryType } from '../model/entry';
import { Type } from 'class-transformer';

export class CreateEntryDto {
    @IsNumber({}, { message: 'Valor deve ser um número' })
    @Min(0.01, { message: 'Valor deve ser maior que zero' })
    @Type(() => Number)
    amount: number;

    @IsEnum(EntryType, { message: 'Tipo deve ser income ou expense' })
    type: EntryType;

    @IsString({ message: 'Descrição deve ser uma string' })
    @Type(() => String)
    description: string;

    @IsDateString({}, { message: 'Data deve ser válida' })
    @Type(() => String)
    date: string;

    @IsNumber({}, { message: 'ID da categoria deve ser um número' })
    @Type(() => Number)
    categoryId: number;
}

export class UpdateEntryDto {
    @IsOptional()
    @IsNumber({}, { message: 'Valor deve ser um número' })
    @Min(0.01, { message: 'Valor deve ser maior que zero' })
    @Type(() => Number)
    amount?: number;

    @IsOptional()
    @IsEnum(EntryType, { message: 'Tipo deve ser income ou expense' })
    @Type(() => String)
    type?: EntryType;

    @IsOptional()
    @IsString({ message: 'Descrição deve ser uma string' })
    @Type(() => String)
    description?: string;

    @IsOptional()
    @IsDateString({}, { message: 'Data deve ser válida' })
    @Type(() => String)
    date?: string;

    @IsOptional()
    @IsNumber({}, { message: 'ID da categoria deve ser um número' })
    @Type(() => Number)
    categoryId?: number;
}
