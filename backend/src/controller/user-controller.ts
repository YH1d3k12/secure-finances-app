import { Request, Response } from 'express';
import { UserService } from '../service/user-service';

export class AuthController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    register = async (req: Request, res: Response) => {
        try {
            const { email, password, name } = req.body;
            const result = await this.userService.register(
                email,
                password,
                name
            );

            res.status(201).json({
                message: 'Usuário criado com sucesso',
                user: {
                    id: result.user.id,
                    email: result.user.email,
                    name: result.user.name,
                    balance: result.user.balance,
                },
                token: result.token,
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const result = await this.userService.login(email, password);

            res.json({
                message: 'Login realizado com sucesso',
                user: {
                    id: result.user.id,
                    email: result.user.email,
                    name: result.user.name,
                    balance: result.user.balance,
                },
                token: result.token,
            });
        } catch (error: any) {
            res.status(401).json({ error: error.message });
        }
    };
}
