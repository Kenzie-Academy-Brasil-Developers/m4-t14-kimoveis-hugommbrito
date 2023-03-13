import { compare } from 'bcryptjs'
import { AppDataSource } from '../data-source'
import { User } from '../entities'
import { AppError } from '../errors'
import { iAuthLogin, iAuthToken } from '../interfaces/auth.interface'
import { iUserRepo } from '../interfaces/user.interface'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const login = async (payload: iAuthLogin): Promise<string> => {
    const userRepository: iUserRepo = AppDataSource.getRepository(User)

    const loggedUser: User | null = await userRepository.findOne({
        where: {
            email: payload.email
        }
    })

    if(!loggedUser || loggedUser.deletedAt){
        throw new AppError('Invalid credentials', 401)
    }
    
    const isPasswordMatch: boolean = await compare(payload.password, loggedUser.password)
    
    if(!isPasswordMatch){
        throw new AppError('Invalid credentials', 401)
    }
    // console.log(loggedUser);
    
    const token: string = jwt.sign(
        {
            id: loggedUser.id,
            admin: loggedUser.admin,
            deletedAt: loggedUser.deletedAt
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: '24h',
            subject: loggedUser.id.toString()
        }
    )

    // const token: iAuthToken = {
    //     token: jwtGenerated
    // }

    return token

}

export default { login }
