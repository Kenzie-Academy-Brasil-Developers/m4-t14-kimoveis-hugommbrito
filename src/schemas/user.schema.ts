import { z } from 'zod'

const post = z.object({
    name: z.string().max(45),
    email: z.string().email().max(45),
    password: z.string().max(120),
    admin: z.boolean().optional().default(false)

})

const returned = post.extend({
    id: z.number(),
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),
    deletedAt: z.string().nullish()
}).omit({
    password: true
})

const patch = post.omit({
    admin: true
}).partial()

export default { post, returned, patch }
