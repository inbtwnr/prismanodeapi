import { db } from '../utils/db.server'

type Expense = {
    amount: number;
    category: string;
    date: Date;
}

const listExpencese = async (): Promise<Expense[]>  => {
    return db.expense.findMany({
        select: {
            id: true,
            amount: true,
            category: true,
            date: true
        }
    })
}

const getExpense = async (id: number): Promise<Expense | null> => {
    return db.expense.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            amount: true,
            category: true,
            date: true
        }
    })
}

export { listExpencese, getExpense }