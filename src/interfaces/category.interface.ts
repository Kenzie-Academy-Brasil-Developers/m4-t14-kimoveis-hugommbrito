import { Repository } from 'typeorm'
import { z } from 'zod'
import { Category } from '../entities'
import { categorySchema } from '../schemas'

export type iCategPost = z.infer<typeof categorySchema.post>
export type iCategReturned = z.infer<typeof categorySchema.returned>

export type iCategRepo = Repository<Category>