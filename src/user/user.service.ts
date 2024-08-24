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

const getUser = async (id: number): Promise<User | null> => {
    return db.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true
        }
    })
}

const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
    const { name } = user
    return db.user.create({
        data: {
            name
        },
        select: {
            id: true,
            name: true
        }
    })
}

const updateUser = async (id: number, user: Omit<User, 'id'>): Promise<User | null> => {
    const { name } = user
    return db.user.update({
        where: {
            id
        },
        data: {
            name
        },
        select: {
            id: true,
            name: true
        }
    })
}

const deleteUser = async (id: number): Promise<User | null> => {
    return db.user.delete({
        where: {
            id
        },
        select: {
            id: true,
            name: true
        }
    })
}

export { listUsers, getUser, createUser, updateUser, deleteUser }