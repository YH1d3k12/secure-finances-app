import {
    IsString,
    IsNumber,
    IsEnum,
    IsDateString,
    IsOptional,
    Min,
} from 'class-validator';
import { EntryType } from '../model/entry';

export class CreateEntryDto {
    @IsNumber({}, { message: 'Valor deve ser um número' })
    @Min(0.01, { message: 'Valor deve ser maior que zero' })
    amount: number;

    @IsEnum(EntryType, { message: 'Tipo deve ser income ou expense' })
    type: EntryType;

    @IsString({ message: 'Descrição deve ser uma string' })
    description: string;

    @IsDateString({}, { message: 'Data deve ser válida' })
    date: string;

    @IsNumber({}, { message: 'ID da categoria deve ser um número' })
    categoryId: number;
}

export class UpdateEntryDto {
    @IsOptional()
    @IsNumber({}, { message: 'Valor deve ser um número' })
    @Min(0.01, { message: 'Valor deve ser maior que zero' })
    amount?: number;

    @IsOptional()
    @IsEnum(EntryType, { message: 'Tipo deve ser income ou expense' })
    type?: EntryType;

    @IsOptional()
    @IsString({ message: 'Descrição deve ser uma string' })
    description?: string;

    @IsOptional()
    @IsDateString({}, { message: 'Data deve ser válida' })
    date?: string;

    @IsOptional()
    @IsNumber({}, { message: 'ID da categoria deve ser um número' })
    categoryId?: number;
}
