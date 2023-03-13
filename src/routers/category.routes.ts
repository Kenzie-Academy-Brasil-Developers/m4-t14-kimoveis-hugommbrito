import { Router } from "express";
import { categoryController } from "../controllers";
import { isCategIdValidMdwr } from "../middlewares/categories/isCategIdValid.middleware";
import { isCategUniqueMdwr } from "../middlewares/categories/isCategUnique.middlewares";
import { isAdminMdwr } from "../middlewares/user/isAdmin.middleware";
import { validateTokenMdwr } from "../middlewares/user/validateToken.middleware";
import { validateDataMdwr } from "../middlewares/validateData.middleware";
import { categorySchema } from "../schemas";

export const categRouter = Router()

categRouter.post('',
    validateDataMdwr(categorySchema.post),
    validateTokenMdwr,
    isAdminMdwr,
    isCategUniqueMdwr,
    categoryController.create)

categRouter.get('', 
    categoryController.read)

categRouter.get('/:id/realEstate',
    isCategIdValidMdwr, 
    categoryController.readById)