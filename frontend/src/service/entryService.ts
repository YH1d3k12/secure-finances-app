import api from './api';
import { Entry } from '../types';

export const entryService = {
    async getEntries(filters?: {
        type?: 'income' | 'expense';
        categoryId?: number;
        startDate?: string;
        endDate?: string;
    }): Promise<Entry[]> {
        const response = await api.get('/entry', { params: filters });
        return response.data.entries;
    },

    async createEntry(data: {
        amount: number;
        type: 'income' | 'expense';
        description: string;
        date: string;
        categoryId: number;
        attachment?: File;
    }): Promise<Entry> {
        const formData = new FormData();
        formData.append('amount', data.amount.toString());
        formData.append('type', data.type);
        formData.append('description', data.description);
        formData.append('date', data.date);
        formData.append('categoryId', data.categoryId.toString());

        if (data.attachment) {
            formData.append('attachment', data.attachment);
        }

        const response = await api.post('/entry', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.entry;
    },

    async updateEntry(
        id: number,
        data: {
            amount?: number;
            type?: 'income' | 'expense';
            description?: string;
            date?: string;
            categoryId?: number;
            attachment?: File;
        }
    ): Promise<Entry> {
        const formData = new FormData();

        if (data.amount !== undefined)
            formData.append('amount', data.amount.toString());
        if (data.type) formData.append('type', data.type);
        if (data.description) formData.append('description', data.description);
        if (data.date) formData.append('date', data.date);
        if (data.categoryId !== undefined)
            formData.append('categoryId', data.categoryId.toString());
        if (data.attachment) formData.append('attachment', data.attachment);

        const response = await api.put(`/entry/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.entry;
    },

    async deleteEntry(id: number): Promise<void> {
        await api.delete(`/entry/${id}`);
    },

    async getBalance(): Promise<number> {
        const response = await api.get('/entry/balance');
        return response.data.balance;
    },
};
