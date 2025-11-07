import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import helmet from 'helmet';
import { initializeDatabase } from './config/database';
import { sanitizeMiddleware } from './middleware/sanitizeMiddleware';

// Rotas
import userRoutes from './routes/user';
import entryRoutes from './routes/entry';
import categoryRoutes from './routes/category';

// Configuração inicial
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// ===================
// 🧱 Middlewares base
// ===================
app.use(
    cors({
        origin: 'http://localhost:5173',
    })
);

app.use(helmet()); 

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", ""],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'", "http://localhost:5173"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      frameAncestors: ["'none'"],
      formAction: ["'self'"],
      upgradeInsecureRequests: [],
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sanitizeMiddleware);

// ===================
// 📂 Arquivos estáticos
// ===================
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ===================
// 🚏 Rotas principais
// ===================
app.use('/api/auth', userRoutes);
app.use('/api/entry', entryRoutes);
app.use('/api/category', categoryRoutes);

// ===================
// 💚 Health check
// ===================
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'API está funcionando' });
});

// ===================
// 🚨 Tratamento de erros
// ===================
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

// ===================
// 🚀 Inicialização
// ===================
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
