import { Repository } from 'typeorm'
import { z } from 'zod'
import { User } from '../entities'
import { userSchema } from '../schemas'

export type iUserPost = z.infer<typeof userSchema.post>
export type iUserReturned = z.infer<typeof userSchema.returned>
export type iUserPatch = z.infer<typeof userSchema.patch>

export type iUserRepo = Repository<User>
