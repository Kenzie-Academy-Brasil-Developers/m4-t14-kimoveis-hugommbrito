import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../../data-source'
import { Category } from '../../entities'
import { AppError } from '../../errors'
import { iCategRepo } from '../../interfaces/category.interface'

export const isCategUniqueMdwr = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
  const categRepository: iCategRepo = AppDataSource.getRepository(Category)

  const categExistis = await categRepository.findOne({
    where: {
      name: req.body.name,
    },
  })

  if (categExistis) {
    throw new AppError('Category already exists', 409)
  }

  return next()
}
