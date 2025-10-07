import { Repository } from 'typeorm';
import { AppDataSource } from '../../database';
import { Transaction, TransactionType } from '../model/transaction';

export class TransactionRepository {
    private repository: Repository<Transaction>;

    constructor() {
        this.repository = AppDataSource.getRepository(Transaction);
    }

    async findByUserId(
        userId: number,
        filters?: {
            type?: TransactionType;
            categoryId?: number;
            startDate?: Date;
            endDate?: Date;
        }
    ): Promise<Transaction[]> {
        const query = this.repository
            .createQueryBuilder('transaction')
            .leftJoinAndSelect('transaction.category', 'category')
            .leftJoinAndSelect('transaction.user', 'user')
            .where('user.id = :userId', { userId });

        if (filters?.type) {
            query.andWhere('transaction.type = :type', { type: filters.type });
        }

        if (filters?.categoryId) {
            query.andWhere('category.id = :categoryId', {
                categoryId: filters.categoryId,
            });
        }

        if (filters?.startDate) {
            query.andWhere('transaction.date >= :startDate', {
                startDate: filters.startDate,
            });
        }

        if (filters?.endDate) {
            query.andWhere('transaction.date <= :endDate', {
                endDate: filters.endDate,
            });
        }

        return query.orderBy('transaction.date', 'DESC').getMany();
    }

    async findById(id: number): Promise<Transaction | null> {
        return this.repository.findOne({
            where: { id },
            relations: ['user', 'category'],
        });
    }

    async create(transactionData: Partial<Transaction>): Promise<Transaction> {
        const transaction = this.repository.create(transactionData);
        return this.repository.save(transaction);
    }

    async update(
        id: number,
        transactionData: Partial<Transaction>
    ): Promise<Transaction | null> {
        await this.repository.update(id, transactionData);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
