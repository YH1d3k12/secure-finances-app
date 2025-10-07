import { Request, Response, NextFunction } from 'express';
import { UserService } from '../service/user-service';

export interface AuthRequest extends Request {
    userId?: number;
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: 'Token de acesso requerido' });
        }

        const userService = new UserService();
        const decoded = userService.verifyToken(token);
        req.userId = decoded.userId;

        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }
};
