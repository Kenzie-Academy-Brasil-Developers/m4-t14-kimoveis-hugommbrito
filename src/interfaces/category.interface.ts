import { Repository } from 'typeorm'
import { z } from 'zod'
import { Category, RealEstate } from '../entities'
import { categorySchema } from '../schemas'

export type iCategPost = z.infer<typeof categorySchema.post>
export type iCategReturned = z.infer<typeof categorySchema.returned>
export interface iCategIdRE_Return extends iCategReturned {
    realEstate: RealEstate[]
}

export type iCategRepo = Repository<Category>