import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { initializeDatabase } from './config/database';
import { sanitizeMiddleware } from './middleware/sanitizeMiddleware';
import userRoutes from './routes/user';
import entryRoutes from './routes/entry';
import categoryRoutes from './routes/category';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares de segurança
app.use(
    cors({
        origin: 'http://localhost:5173',
        // Se usar JWT, não precisa de credentials true para cookies
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Pode manter se lidar com cookies (não para sessão)

// Middleware de sanitização para prevenir XSS
app.use(sanitizeMiddleware);

// Servir arquivos estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rotas
app.use('/api/auth', userRoutes);
app.use('/api/entry', entryRoutes);
app.use('/api/category', categoryRoutes);

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
