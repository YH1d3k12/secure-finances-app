import {
    IsString,
    IsNumber,
    IsEnum,
    IsDateString,
    IsOptional,
    Min,
} from 'class-validator';
import { TransactionType } from '../model/transaction';

export class CreateTransactionDto {
    @IsNumber({}, { message: 'Valor deve ser um número' })
    @Min(0.01, { message: 'Valor deve ser maior que zero' })
    amount: number;

    @IsEnum(TransactionType, { message: 'Tipo deve ser income ou expense' })
    type: TransactionType;

    @IsString({ message: 'Descrição deve ser uma string' })
    description: string;

    @IsDateString({}, { message: 'Data deve ser válida' })
    date: string;

    @IsNumber({}, { message: 'ID da categoria deve ser um número' })
    categoryId: number;
}

export class UpdateTransactionDto {
    @IsOptional()
    @IsNumber({}, { message: 'Valor deve ser um número' })
    @Min(0.01, { message: 'Valor deve ser maior que zero' })
    amount?: number;

    @IsOptional()
    @IsEnum(TransactionType, { message: 'Tipo deve ser income ou expense' })
    type?: TransactionType;

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
