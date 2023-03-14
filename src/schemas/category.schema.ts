import { z } from 'zod'

const post = z.object({
    name: z.string().max(45),

})

const returned = post.extend({
    id: z.number()
})

export default { post, returned }
