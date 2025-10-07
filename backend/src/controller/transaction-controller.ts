import { Response } from 'express';
import { TransactionService } from '../service/transaction-service';
import { AuthRequest } from '../middleware';
import { TransactionType } from '../model/transaction';

export class TransactionController {
    private transactionService: TransactionService;

    constructor() {
        this.transactionService = new TransactionService();
    }

    create = async (req: AuthRequest, res: Response) => {
        try {
            const { amount, type, description, date, categoryId } = req.body;
            const userId = req.userId!;
            const attachment = req.file?.filename;

            const transaction = await this.transactionService.createTransaction(
                userId,
                amount,
                type,
                description,
                new Date(date),
                categoryId,
                attachment
            );

            res.status(201).json({
                message: 'Transação criada com sucesso',
                transaction: {
                    id: transaction.id,
                    amount: transaction.amount,
                    type: transaction.type,
                    description: transaction.description,
                    date: transaction.date,
                    attachment: transaction.attachment,
                    category: {
                        id: transaction.category.id,
                        name: transaction.category.name,
                    },
                },
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    getAll = async (req: AuthRequest, res: Response) => {
        try {
            const userId = req.userId!;
            const { type, categoryId, startDate, endDate } = req.query;

            const filters: any = {};
            if (type) filters.type = type as TransactionType;
            if (categoryId) filters.categoryId = parseInt(categoryId as string);
            if (startDate) filters.startDate = new Date(startDate as string);
            if (endDate) filters.endDate = new Date(endDate as string);

            const transactions =
                await this.transactionService.getUserTransactions(
                    userId,
                    filters
                );

            res.json({
                transactions: transactions.map(transaction => ({
                    id: transaction.id,
                    amount: transaction.amount,
                    type: transaction.type,
                    description: transaction.description,
                    date: transaction.date,
                    attachment: transaction.attachment,
                    category: {
                        id: transaction.category.id,
                        name: transaction.category.name,
                    },
                })),
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    getBalance = async (req: AuthRequest, res: Response) => {
        try {
            const userId = req.userId!;
            const balance = await this.transactionService.getUserBalance(
                userId
            );

            res.json({ balance });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    update = async (req: AuthRequest, res: Response) => {
        try {
            const transactionId = parseInt(req.params.id);
            const { amount, type, description, date, categoryId } = req.body;
            const userId = req.userId!;
            const attachment = req.file?.filename;

            const transaction = await this.transactionService.updateTransaction(
                transactionId,
                userId,
                amount,
                type,
                description,
                date ? new Date(date) : undefined,
                categoryId,
                attachment
            );

            res.json({
                message: 'Transação atualizada com sucesso',
                transaction: {
                    id: transaction.id,
                    amount: transaction.amount,
                    type: transaction.type,
                    description: transaction.description,
                    date: transaction.date,
                    attachment: transaction.attachment,
                    category: {
                        id: transaction.category.id,
                        name: transaction.category.name,
                    },
                },
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    delete = async (req: AuthRequest, res: Response) => {
        try {
            const transactionId = parseInt(req.params.id);
            const userId = req.userId!;

            await this.transactionService.deleteTransaction(
                transactionId,
                userId
            );

            res.json({ message: 'Transação removida com sucesso' });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };
}
