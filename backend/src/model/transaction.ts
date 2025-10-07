import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user';
import { Category } from './category';

export enum TransactionType {
    INCOME = 'income',
    EXPENSE = 'expense',
}

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column({
        type: 'enum',
        enum: TransactionType,
    })
    type: TransactionType;

    @Column()
    description: string;

    @Column({ type: 'date' })
    date: Date;

    @Column({ nullable: true })
    attachment: string;

    @ManyToOne(() => User, user => user.transactions)
    user: User;

    @ManyToOne(() => Category, category => category.transactions)
    category: Category;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
