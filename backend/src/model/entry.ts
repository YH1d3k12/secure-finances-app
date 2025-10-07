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

export enum EntryType {
    INCOME = 'income',
    EXPENSE = 'expense',
}

@Entity()
export class Entry {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column({
        type: 'text',
        enum: EntryType,
    })
    type: EntryType;

    @Column()
    description: string;

    @Column({ type: 'date' })
    date: Date;

    @Column({ nullable: true })
    attachment: string;

    @ManyToOne(() => User, user => user.entries)
    user: User;

    @ManyToOne(() => Category, category => category.entries)
    category: Category;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
