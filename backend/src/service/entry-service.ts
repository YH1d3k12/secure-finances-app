import { Entry, EntryType } from '../model/entry';
import { CategoryRepository } from '../repository/category-repository';
import { EntryRepository } from '../repository/entry-repository';
import { UserRepository } from '../repository/user-repository';

export class EntryService {
    private entryRepository: EntryRepository;
    private userRepository: UserRepository;
    private categoryRepository: CategoryRepository;

    constructor() {
        this.entryRepository = new EntryRepository();
        this.userRepository = new UserRepository();
        this.categoryRepository = new CategoryRepository();
    }

    async createEntry(
        userId: number,
        amount: number,
        type: EntryType,
        description: string,
        date: Date,
        categoryId: number,
        attachment?: string
    ): Promise<Entry> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const category = await this.categoryRepository.findById(categoryId);
        if (!category || category.user.id !== userId) {
            throw new Error('Categoria não encontrada');
        }

        const entry = await this.entryRepository.create({
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
            type === EntryType.INCOME
                ? user.balance + amount
                : user.balance - amount;

        await this.userRepository.updateBalance(userId, newBalance);

        return entry;
    }

    async getUserEntries(
        userId: number,
        filters?: {
            type?: EntryType;
            categoryId?: number;
            startDate?: Date;
            endDate?: Date;
        }
    ): Promise<Entry[]> {
        return this.entryRepository.findByUserId(userId, filters);
    }

    async getUserBalance(userId: number): Promise<number> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        return user.balance;
    }

    async updateEntry(
        entryId: number,
        userId: number,
        amount?: number,
        type?: EntryType,
        description?: string,
        date?: Date,
        categoryId?: number,
        attachment?: string
    ): Promise<Entry> {
        const entry = await this.entryRepository.findById(entryId);
        if (!entry || entry.user.id !== userId) {
            throw new Error('Entrada não encontrada');
        }

        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        // Reverter o efeito da entrada anterior no saldo
        const oldAmount = entry.amount;
        const oldType = entry.type;
        let newBalance =
            oldType === EntryType.INCOME
                ? user.balance - oldAmount
                : user.balance + oldAmount;

        const updateData: Partial<Entry> = {};

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

        const updatedEntry = await this.entryRepository.update(
            entryId,
            updateData
        );
        if (!updatedEntry) {
            throw new Error('Erro ao atualizar entrada');
        }

        // Aplicar o efeito da nova entrada no saldo
        const finalAmount = amount !== undefined ? amount : oldAmount;
        const finalType = type !== undefined ? type : oldType;
        newBalance =
            finalType === EntryType.INCOME
                ? newBalance + finalAmount
                : newBalance - finalAmount;

        await this.userRepository.updateBalance(userId, newBalance);

        return updatedEntry;
    }

    async deleteEntry(entryId: number, userId: number): Promise<void> {
        const entry = await this.entryRepository.findById(entryId);
        if (!entry || entry.user.id !== userId) {
            throw new Error('Entrada não encontrada');
        }

        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        // Reverter o efeito da entrada no saldo
        const newBalance =
            entry.type === EntryType.INCOME
                ? user.balance - entry.amount
                : user.balance + entry.amount;

        await this.userRepository.updateBalance(userId, newBalance);
        await this.entryRepository.delete(entryId);
    }
}
