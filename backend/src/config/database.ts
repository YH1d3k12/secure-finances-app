import { DataSource } from 'typeorm';
import { User } from '../model/user';
import { Category } from '../model/category';
import { Entry } from '../model/entry';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true,
    logging: false,
    entities: [User, Category, Entry],
    migrations: [],
    subscribers: [],
});

export const initializeDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log('✅ Banco de dados conectado com sucesso');
    } catch (error) {
        console.error('❌ Erro ao conectar ao banco de dados:', error);
        throw error;
    }
};
