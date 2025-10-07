import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { initializeDatabase } from './config/database';
import { sanitizeMiddleware } from './src/middleware/sanitizeMiddleware';
import userRoutes from './src/routes/user';
import transactionRoutes from './src/routes/transactionRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares de segurança
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configuração de sessão com proteção contra Session Hijacking
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'default_secret_change_me',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true, // Previne acesso via JavaScript (XSS)
            secure: process.env.NODE_ENV === 'production', // HTTPS apenas em produção
            sameSite: 'strict', // Proteção contra CSRF
            maxAge: 1000 * 60 * 60 * 24, // 24 horas
        },
    })
);

// Middleware de sanitização para prevenir XSS
app.use(sanitizeMiddleware);

// Servir arquivos estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rotas
app.use('/api/auth', userRoutes);
app.use('/api/transactions', transactionRoutes);

// Rota de health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'API está funcionando' });
});

// Tratamento de erros global
app.use(
    (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        console.error('Erro:', err);
        res.status(err.status || 500).json({
            error: err.message || 'Erro interno do servidor',
        });
    }
);

// Inicializar banco de dados e servidor
const startServer = async () => {
    try {
        await initializeDatabase();

        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
            console.log(
                `📊 Ambiente: ${process.env.NODE_ENV || 'development'}`
            );
        });
    } catch (error) {
        console.error('Erro ao iniciar servidor:', error);
        process.exit(1);
    }
};

startServer();

export default app;
