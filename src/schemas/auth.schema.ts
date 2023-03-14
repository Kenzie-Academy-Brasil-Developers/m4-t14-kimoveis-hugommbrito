import { z } from 'zod'
import { userSchema } from '.'

const login = userSchema.post.pick({
    email: true,
    password: true
})

const token = z.object({
    token: z.string()
})

export default { login, token }
