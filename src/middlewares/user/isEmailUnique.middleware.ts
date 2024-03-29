import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { AppError } from '../../errors'
import { iUserRepo } from '../../interfaces/user.interface'

export const isEmailUniqueMdwr = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    if (!req.body.email) {
        return next()
    }

    const userRepository: iUserRepo = AppDataSource.getRepository(User)

    const emailExistis = await userRepository.findOne({
        where: {
            email: req.body.email,
        },
    })

    if (emailExistis) {
        throw new AppError('Email already exists', 409)
    }

    return next()
}
