import { AppDataSource } from '../data-source'
import { User } from '../entities'
import { iUserPost, iUserRepo, iUserReturned } from '../interfaces/user.interface'
import { userSchema } from '../schemas'

const create = async (payload: iUserPost): Promise<iUserReturned> => {
    const userRepository: iUserRepo = AppDataSource.getRepository(User)
    let newUser: User = userRepository.create(payload)

    await userRepository.save(newUser)

    const newUserParsed: iUserReturned = userSchema.returned.parse(newUser)

    return newUserParsed

} 

const readAll = async (): Promise<User[]> => {
    const userRepository: iUserRepo = AppDataSource.getRepository(User)
    let userList = await userRepository.find({
        select: ['id', 'name', 'email', 'admin', 'createdAt', 'updatedAt', 'deletedAt'],

    })
        
    return userList

}

const update = async (payload: any, idUser: number): Promise<iUserReturned> => {
    const userRepostitory: iUserRepo = AppDataSource.getRepository(User)
    const userToUpdate = await userRepostitory.findOne({
        where: {
            id: idUser
        }
    })

    const newUser = userRepostitory.create({
        ...userToUpdate,
        ...payload
    })

    await userRepostitory.save(newUser!)

    const updatedUser = userSchema.returned.parse(newUser)

    return updatedUser

}

const deleter = async (idUser: number): Promise<void> => {
    const userRepository: iUserRepo = AppDataSource.getRepository(User)
    const userToDelete: User | null = await userRepository.findOne({
        where:{
            id: idUser
        }
    })

    await userRepository.softRemove(userToDelete!)

}

export default { create, readAll, update, deleter }
