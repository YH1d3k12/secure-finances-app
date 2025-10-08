import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repository/user-repository';
import { User } from '../model/user';

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    // Cria um novo usuário e retorna o token JWT
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

    // Login do usuário, valida senha e retorna token JWT
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

    // Gera token JWT
    private generateToken(userId: number): string {
        const secret = this.getSecret();
        return jwt.sign({ userId }, secret, { expiresIn: '24h' });
    }

    // Verifica token JWT
    verifyToken(token: string): { userId: number } {
        try {
            const secret = this.getSecret();
            const decoded = jwt.verify(token, secret);
            return decoded as { userId: number };
        } catch {
            throw new Error('Token inválido');
        }
    }

    // Lê a secret do JWT dinamicamente
    private getSecret(): string {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET não definido');
        }
        return secret;
    }
}
