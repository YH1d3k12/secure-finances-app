import { Repository } from 'typeorm';
import { AppDataSource } from '../../database';
import { Category } from '../model/category';

export class CategoryRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = AppDataSource.getRepository(Category);
    }

    async findByUserId(userId: number): Promise<Category[]> {
        return this.repository.find({
            where: { user: { id: userId } },
            relations: ['user'],
        });
    }

    async findById(id: number): Promise<Category | null> {
        return this.repository.findOne({
            where: { id },
            relations: ['user'],
        });
    }

    async create(categoryData: Partial<Category>): Promise<Category> {
        const category = this.repository.create(categoryData);
        return this.repository.save(category);
    }

    async update(
        id: number,
        categoryData: Partial<Category>
    ): Promise<Category | null> {
        await this.repository.update(id, categoryData);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
