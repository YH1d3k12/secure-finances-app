import { Transaction } from 'typeorm';
import { TransactionType } from '../model/transaction';
import { CategoryRepository } from '../repository/category-repository';
import { TransactionRepository } from '../repository/transaction-repository';
import { UserRepository } from '../repository/user-repository';

export class TransactionService {
    private transactionRepository: TransactionRepository;
    private userRepository: UserRepository;
    private categoryRepository: CategoryRepository;

    constructor() {
        this.transactionRepository = new TransactionRepository();
        this.userRepository = new UserRepository();
        this.categoryRepository = new CategoryRepository();
    }

    async createTransaction(
        userId: number,
        amount: number,
        type: TransactionType,
        description: string,
        date: Date,
        categoryId: number,
        attachment?: string
    ): Promise<Transaction> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const category = await this.categoryRepository.findById(categoryId);
        if (!category || category.user.id !== userId) {
            throw new Error('Categoria não encontrada');
        }

        const transaction = await this.transactionRepository.create({
            amount,
            type,
            description,
            date,
            attachment,
            user,
            category,
        });

        // Atualizar saldo do usuário
        const newBalance =
            type === TransactionType.INCOME
                ? user.balance + amount
                : user.balance - amount;

        await this.userRepository.updateBalance(userId, newBalance);

        return transaction;
    }

    async getUserTransactions(
        userId: number,
        filters?: {
            type?: TransactionType;
            categoryId?: number;
            startDate?: Date;
            endDate?: Date;
        }
    ): Promise<Transaction[]> {
        return this.transactionRepository.findByUserId(userId, filters);
    }

    async getUserBalance(userId: number): Promise<number> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        return user.balance;
    }

    async updateTransaction(
        transactionId: number,
        userId: number,
        amount?: number,
        type?: TransactionType,
        description?: string,
        date?: Date,
        categoryId?: number,
        attachment?: string
    ): Promise<Transaction> {
        const transaction = await this.transactionRepository.findById(
            transactionId
        );
        if (!transaction || transaction.user.id !== userId) {
            throw new Error('Transação não encontrada');
        }

        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        // Reverter o efeito da transação anterior no saldo
        const oldAmount = transaction.amount;
        const oldType = transaction.type;
        let newBalance =
            oldType === TransactionType.INCOME
                ? user.balance - oldAmount
                : user.balance + oldAmount;

        const updateData: Partial<Transaction> = {};

        if (amount !== undefined) updateData.amount = amount;
        if (type !== undefined) updateData.type = type;
        if (description !== undefined) updateData.description = description;
        if (date !== undefined) updateData.date = date;
        if (attachment !== undefined) updateData.attachment = attachment;

        if (categoryId !== undefined) {
            const category = await this.categoryRepository.findById(categoryId);
            if (!category || category.user.id !== userId) {
                throw new Error('Categoria não encontrada');
            }
            updateData.category = category;
        }

        const updatedTransaction = await this.transactionRepository.update(
            transactionId,
            updateData
        );
        if (!updatedTransaction) {
            throw new Error('Erro ao atualizar transação');
        }

        // Aplicar o efeito da nova transação no saldo
        const finalAmount = amount !== undefined ? amount : oldAmount;
        const finalType = type !== undefined ? type : oldType;
        newBalance =
            finalType === TransactionType.INCOME
                ? newBalance + finalAmount
                : newBalance - finalAmount;

        await this.userRepository.updateBalance(userId, newBalance);

        return updatedTransaction;
    }

    async deleteTransaction(
        transactionId: number,
        userId: number
    ): Promise<void> {
        const transaction = await this.transactionRepository.findById(
            transactionId
        );
        if (!transaction || transaction.user.id !== userId) {
            throw new Error('Transação não encontrada');
        }

        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        // Reverter o efeito da transação no saldo
        const newBalance =
            transaction.type === TransactionType.INCOME
                ? user.balance - transaction.amount
                : user.balance + transaction.amount;

        await this.userRepository.updateBalance(userId, newBalance);
        await this.transactionRepository.delete(transactionId);
    }
}
