import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { Entry, EntryType } from '../model/entry';

export class EntryRepository {
    private repository: Repository<Entry>;

    constructor() {
        this.repository = AppDataSource.getRepository(Entry);
    }

    async findByUserId(
        userId: number,
        filters?: {
            type?: EntryType;
            categoryId?: number;
            startDate?: Date;
            endDate?: Date;
        }
    ): Promise<Entry[]> {
        const query = this.repository
            .createQueryBuilder('entry')
            .leftJoinAndSelect('entry.category', 'category')
            .leftJoinAndSelect('entry.user', 'user')
            .where('user.id = :userId', { userId });

        if (filters?.type) {
            query.andWhere('entry.type = :type', { type: filters.type });
        }

        if (filters?.categoryId) {
            query.andWhere('category.id = :categoryId', {
                categoryId: filters.categoryId,
            });
        }

        if (filters?.startDate) {
            query.andWhere('entry.date >= :startDate', {
                startDate: filters.startDate,
            });
        }

        if (filters?.endDate) {
            query.andWhere('entry.date <= :endDate', {
                endDate: filters.endDate,
            });
        }

        return query.orderBy('entry.date', 'DESC').getMany();
    }

    async findById(id: number): Promise<Entry | null> {
        return this.repository.findOne({
            where: { id },
            relations: ['user', 'category'],
        });
    }

    async create(entryData: Partial<Entry>): Promise<Entry> {
        const entry = this.repository.create(entryData);
        return this.repository.save(entry);
    }

    async update(id: number, entryData: Partial<Entry>): Promise<Entry | null> {
        await this.repository.update(id, entryData);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
