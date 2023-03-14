import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../../data-source'
import { Address } from '../../entities'
import { AppError } from '../../errors'
import { iAD_Repo } from '../../interfaces/realEstateAddress.interface'

export const isAddressUniqueMdwr = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
    const ADRepository: iAD_Repo = AppDataSource.getRepository(Address)
  
    if(!req.body.address.number){
        return next()
    }

    const addressExists = await ADRepository.findOne({
        where: {
            number: req.body.address.number
        },
    })
    

    if (addressExists) {
      throw new AppError('Address already exists', 409)
    }
  
    return next()
  }
  