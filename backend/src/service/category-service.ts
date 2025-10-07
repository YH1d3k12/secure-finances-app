import { UserRepository } from '../repository/user-repository';
import { CategoryRepository } from '../repository/category-repository';
import { Category } from '../model/category';

export class CategoryService {
    private categoryRepository: CategoryRepository;
    private userRepository: UserRepository;

    constructor() {
        this.categoryRepository = new CategoryRepository();
        this.userRepository = new UserRepository();
    }

    async createCategory(
        userId: number,
        name: string,
        description?: string
    ): Promise<Category> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        return this.categoryRepository.create({
            name,
            description,
            user,
        });
    }

    async getUserCategories(userId: number): Promise<Category[]> {
        return this.categoryRepository.findByUserId(userId);
    }

    async updateCategory(
        categoryId: number,
        userId: number,
        name?: string,
        description?: string
    ): Promise<Category> {
        const category = await this.categoryRepository.findById(categoryId);
        if (!category || category.user.id !== userId) {
            throw new Error('Categoria não encontrada');
        }

        const updateData: Partial<Category> = {};
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;

        const updatedCategory = await this.categoryRepository.update(
            categoryId,
            updateData
        );
        if (!updatedCategory) {
            throw new Error('Erro ao atualizar categoria');
        }

        return updatedCategory;
    }

    async deleteCategory(categoryId: number, userId: number): Promise<void> {
        const category = await this.categoryRepository.findById(categoryId);
        if (!category || category.user.id !== userId) {
            throw new Error('Categoria não encontrada');
        }

        await this.categoryRepository.delete(categoryId);
    }
}
