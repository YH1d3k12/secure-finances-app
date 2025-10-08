import api from './api';
import { Transaction } from '../types';

export const transactionService = {
    async getTransactions(filters?: {
        type?: 'income' | 'expense';
        categoryId?: number;
        startDate?: string;
        endDate?: string;
    }): Promise<Transaction[]> {
        const response = await api.get('/entries', { params: filters });
        return response.data.transactions;
    },

    async createTransaction(data: {
        amount: number;
        type: 'income' | 'expense';
        description: string;
        date: string;
        categoryId: number;
        attachment?: File;
    }): Promise<Transaction> {
        const formData = new FormData();
        formData.append('amount', data.amount.toString());
        formData.append('type', data.type);
        formData.append('description', data.description);
        formData.append('date', data.date);
        formData.append('categoryId', data.categoryId.toString());

        if (data.attachment) {
            formData.append('attachment', data.attachment);
        }

        const response = await api.post('/entries', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.transaction;
    },

    async updateTransaction(
        id: number,
        data: {
            amount?: number;
            type?: 'income' | 'expense';
            description?: string;
            date?: string;
            categoryId?: number;
            attachment?: File;
        }
    ): Promise<Transaction> {
        const formData = new FormData();

        if (data.amount !== undefined)
            formData.append('amount', data.amount.toString());
        if (data.type) formData.append('type', data.type);
        if (data.description) formData.append('description', data.description);
        if (data.date) formData.append('date', data.date);
        if (data.categoryId !== undefined)
            formData.append('categoryId', data.categoryId.toString());
        if (data.attachment) formData.append('attachment', data.attachment);

        const response = await api.put(`/entries/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.transaction;
    },

    async deleteTransaction(id: number): Promise<void> {
        await api.delete(`/entries/${id}`);
    },

    async getBalance(): Promise<number> {
        const response = await api.get('/entries/balance');
        return response.data.balance;
    },
};
