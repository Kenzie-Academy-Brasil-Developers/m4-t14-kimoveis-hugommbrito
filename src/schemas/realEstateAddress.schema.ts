import { number, z } from 'zod'
import categorySchema from './category.schema'

const AD_post = z.object({
    street: z.string().max(45),
    zipCode: z.string().max(8),
    number: z.string().max(7).nullish(),
    city: z.string().max(20),
    state: z.string().max(2)
})

const AD_postReturn = AD_post.extend({
    id: z.number()
})

const RE_postRequest = z.object({
    value: z.string().or(z.number()),
    size: z.number().gt(0),
    address: AD_post,
    categoryId: z.number()
})

const RE_postCreate = RE_postRequest.extend({
    category: categorySchema.returned
}).omit({
    categoryId: true
})

const RE_postReturn = RE_postCreate.extend({
    id: z.number(),
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),

})

export default { AD_post, AD_postReturn, RE_postRequest, RE_postCreate, RE_postReturn }
