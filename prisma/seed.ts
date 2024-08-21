import { db } from '../src/db.server';

type User = {
    name: string;
}

type Expense = {
    amount: number;
    category: string;
    date: Date;
}

async function seed() {
    await Promise.all(
        getUsers().map((user) => {
            return db.user.create({
                    data:
                        {
                            name: user.name
                        }
                }
            )
        })
    )

    const users = await db.user.findFirst(
        {
            where: {
                name: 'Alice'
            }
        }
    )

    await Promise.all(
        getExpenses().map((expense) => {
            return db.expense.create({
                    data:
                        {
                            amount: expense.amount,
                            category: expense.category,
                            date: expense.date,
                            userId: users.id
                        }
                }
            )
        })
    )
}

seed()

function getUsers (): Array<User> {
    return [
        { name: 'Alice' },
        { name: 'Bob' },
        { name: 'Charlie' }
    ]
}

function getExpenses (): Array<Expense> {
    return [
        { amount: 10, category: 'Food', date: new Date() },
        { amount: 20, category: 'Transport', date: new Date() },
        { amount: 30, category: 'Food', date: new Date() }
    ]
}