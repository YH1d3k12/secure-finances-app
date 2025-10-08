import api from './api';
import { Category } from '../types';

export const categoryService = {
    async getCategories(): Promise<Category[]> {
        const response = await api.get('/categories');
        return response.data.categories;
    },

    async createCategory(
        name: string,
        description?: string
    ): Promise<Category> {
        const response = await api.post('/categories', { name, description });
        return response.data.category;
    },

    async updateCategory(
        id: number,
        name?: string,
        description?: string
    ): Promise<Category> {
        const response = await api.put(`/categories/${id}`, {
            name,
            description,
        });
        return response.data.category;
    },

    async deleteCategory(id: number): Promise<void> {
        await api.delete(`/categories/${id}`);
    },
};
