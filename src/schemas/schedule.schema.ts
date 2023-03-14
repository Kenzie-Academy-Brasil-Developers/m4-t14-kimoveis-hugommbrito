import { z } from 'zod'
import realEstateAddressSchema from './realEstateAddress.schema'
import userSchema from './user.schema'

const postRequest = z.object({
    date: z.string(),
    hour: z.string(),
    realEstateId: z.number()
})

const postCreate = postRequest.omit({
    realEstateId: true
}).extend({
    user: userSchema.returned,
    realEstate: realEstateAddressSchema.RE_postReturn
})

const returned = postCreate.extend({
    id: z.number()
})

export default { postRequest, postCreate, returned }
