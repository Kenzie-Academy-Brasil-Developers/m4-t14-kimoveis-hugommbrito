import { Router } from "express";
import { userController } from "../controllers";
import { isAdminMdwr } from "../middlewares/user/isAdmin.middleware";
import { isEmailUniqueMdwr } from "../middlewares/user/isEmailUnique.middleware";
import { isIdValidMdwr } from "../middlewares/user/isIdValid.middleware";
import { validateDataMdwr } from "../middlewares/validateData.middleware";
import { validateTokenMdwr } from "../middlewares/user/validateToken.middleware";
import { validateIdAuthToUpdateMdwr } from "../middlewares/user/validateIdAuthToUpdate.middleware";
import { userSchema } from "../schemas";

export const userRouter = Router();

userRouter.post(
  "",
  validateDataMdwr(userSchema.post),
  isEmailUniqueMdwr,
  userController.create
);

userRouter.get("",
    validateTokenMdwr,
    isAdminMdwr,
    userController.readAll);

userRouter.patch(
  "/:id",
  validateDataMdwr(userSchema.patch),
  validateTokenMdwr,
  isIdValidMdwr,
  validateIdAuthToUpdateMdwr,
  userController.update
);

userRouter.delete(
  "/:id",
  validateTokenMdwr,
  isIdValidMdwr,
  isAdminMdwr,
  userController.deleter
);

// userRouter.post('',)
