import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../../data-source'
import { Category } from '../../entities'
import { AppError } from '../../errors'
import { iCategRepo } from '../../interfaces/category.interface'

export const isCategIdValidMdwr = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
    const categRepository: iCategRepo = AppDataSource.getRepository(Category)
    const IdExistis = await categRepository.findOne({
        where: {
            id: Number(req.params.id),
        },
    })

    if (!IdExistis) {
        throw new AppError('Category not found', 404)
    }

    return next()
}
