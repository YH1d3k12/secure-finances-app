import { DataSource } from 'typeorm';
import { User, Category, Transaction } from './src/model';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'financial_app',
    synchronize: true,
    logging: false,
    entities: [User, Category, Transaction],
    migrations: [],
    subscribers: [],
});
