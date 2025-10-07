import { Response } from 'express';
import { EntryService } from '../service/entry-service';
import { AuthRequest } from '../middleware/auth';
import { EntryType } from '../model/entry';

export class EntryController {
    private entryService: EntryService;

    constructor() {
        this.entryService = new EntryService();
    }

    create = async (req: AuthRequest, res: Response) => {
        try {
            const { amount, type, description, date, categoryId } = req.body;
            const userId = req.userId!;
            const attachment = req.file?.filename;

            const entry = await this.entryService.createEntry(
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
                entry: {
                    id: entry.id,
                    amount: entry.amount,
                    type: entry.type,
                    description: entry.description,
                    date: entry.date,
                    attachment: entry.attachment,
                    category: {
                        id: entry.category.id,
                        name: entry.category.name,
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
            if (type) filters.type = type as EntryType;
            if (categoryId) filters.categoryId = parseInt(categoryId as string);
            if (startDate) filters.startDate = new Date(startDate as string);
            if (endDate) filters.endDate = new Date(endDate as string);

            const entries = await this.entryService.getUserEntries(
                userId,
                filters
            );

            res.json({
                entries: entries.map(entry => ({
                    id: entry.id,
                    amount: entry.amount,
                    type: entry.type,
                    description: entry.description,
                    date: entry.date,
                    attachment: entry.attachment,
                    category: {
                        id: entry.category.id,
                        name: entry.category.name,
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
            const balance = await this.entryService.getUserBalance(userId);

            res.json({ balance });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    update = async (req: AuthRequest, res: Response) => {
        try {
            const entryId = parseInt(req.params.id);
            const { amount, type, description, date, categoryId } = req.body;
            const userId = req.userId!;
            const attachment = req.file?.filename;

            const entry = await this.entryService.updateEntry(
                entryId,
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
                entry: {
                    id: entry.id,
                    amount: entry.amount,
                    type: entry.type,
                    description: entry.description,
                    date: entry.date,
                    attachment: entry.attachment,
                    category: {
                        id: entry.category.id,
                        name: entry.category.name,
                    },
                },
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    delete = async (req: AuthRequest, res: Response) => {
        try {
            const entryId = parseInt(req.params.id);
            const userId = req.userId!;

            await this.entryService.deleteEntry(entryId, userId);

            res.json({ message: 'Transação removida com sucesso' });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };
}
