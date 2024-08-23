import { db } from '../utils/db.server'

type User = {
    id: number;
    name: string | null;
}

const listUsers = async (): Promise<User[]>  => {
    return db.user.findMany({
        select: {
            id: true,
            name: true
        }
    })
}

export { listUsers }