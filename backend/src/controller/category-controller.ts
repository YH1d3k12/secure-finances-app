import { Response } from 'express';
import { CategoryService } from '../service/category-service';
import { AuthRequest } from '../middleware/auth';

export class CategoryController {
    private categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    create = async (req: AuthRequest, res: Response) => {
        try {
            const { name, description } = req.body;
            const userId = req.userId!;

            const category = await this.categoryService.createCategory(
                userId,
                name,
                description
            );

            res.status(201).json({
                message: 'Categoria criada com sucesso',
                category: {
                    id: category.id,
                    name: category.name,
                    description: category.description,
                },
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    getAll = async (req: AuthRequest, res: Response) => {
        try {
            const userId = req.userId!;
            const categories = await this.categoryService.getUserCategories(
                userId
            );

            res.json({
                categories: categories.map(category => ({
                    id: category.id,
                    name: category.name,
                    description: category.description,
                })),
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    update = async (req: AuthRequest, res: Response) => {
        try {
            const categoryId = parseInt(req.params.id);
            const { name, description } = req.body;
            const userId = req.userId!;

            const category = await this.categoryService.updateCategory(
                categoryId,
                userId,
                name,
                description
            );

            res.json({
                message: 'Categoria atualizada com sucesso',
                category: {
                    id: category.id,
                    name: category.name,
                    description: category.description,
                },
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    delete = async (req: AuthRequest, res: Response) => {
        try {
            const categoryId = parseInt(req.params.id);
            const userId = req.userId!;

            await this.categoryService.deleteCategory(categoryId, userId);

            res.json({ message: 'Categoria removida com sucesso' });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };
}
