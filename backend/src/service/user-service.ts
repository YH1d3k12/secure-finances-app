import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repository/user-repository';
import { User } from '../model/user';

export class UserService {
    private userRepository: UserRepository;
    private jwtSecret: string;

    constructor() {
        this.userRepository = new UserRepository();
        this.jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    }

    async register(
        email: string,
        password: string,
        name: string
    ): Promise<{ user: User; token: string }> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('Email já está em uso');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userRepository.create({
            email,
            password: hashedPassword,
            name,
            balance: 0,
        });

        const token = this.generateToken(user.id);
        return { user, token };
    }

    async login(
        email: string,
        password: string
    ): Promise<{ user: User; token: string }> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Credenciais inválidas');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Credenciais inválidas');
        }

        const token = this.generateToken(user.id);
        return { user, token };
    }

    private generateToken(userId: number): string {
        return jwt.sign({ userId }, this.jwtSecret, { expiresIn: '24h' });
    }

    verifyToken(token: string): { userId: number } {
        try {
            const decoded = jwt.verify(token, this.jwtSecret) as {
                userId: number;
            };
            return decoded;
        } catch (error) {
            throw new Error('Token inválido');
        }
    }
}
