import { Repository } from 'typeorm';
import { AppDataSource } from '../../database';
import { User } from '../model/user';

export class UserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.repository.findOne({ where: { email } });
    }

    async findById(id: number): Promise<User | null> {
        return this.repository.findOne({ where: { id } });
    }

    async create(userData: Partial<User>): Promise<User> {
        const user = this.repository.create(userData);
        return this.repository.save(user);
    }

    async update(id: number, userData: Partial<User>): Promise<User | null> {
        await this.repository.update(id, userData);
        return this.findById(id);
    }

    async updateBalance(id: number, balance: number): Promise<void> {
        await this.repository.update(id, { balance });
    }
}
