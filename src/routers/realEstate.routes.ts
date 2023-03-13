import { Router } from "express";
import { realEstateAddressController } from "../controllers";
import { isAddressUniqueMdwr } from "../middlewares/RealEstate_Address/isAddressUnique.middleware";
import { isAdminMdwr } from "../middlewares/user/isAdmin.middleware";
import { validateTokenMdwr } from "../middlewares/user/validateToken.middleware";
import { validateDataMdwr } from "../middlewares/validateData.middleware";
import realEstateAddressSchema from "../schemas/realEstateAddress.schema";

export const realEstateRouter = Router()

realEstateRouter.post('',
    validateDataMdwr(realEstateAddressSchema.RE_postRequest),
    validateTokenMdwr,
    isAdminMdwr,
    isAddressUniqueMdwr,
    realEstateAddressController.create)

realEstateRouter.get('',
    realEstateAddressController.read)