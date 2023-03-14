import { Router } from "express";
import { scheduleController } from "../controllers";
import { isScheduleFreeMdwr } from "../middlewares/RealEstate_Address/isScheduleFree.middleware";
import { isScheduleTimeValidMdwr } from "../middlewares/RealEstate_Address/isScheduleTimeValid.middleware";
import { isRE_IdValidMdwr } from "../middlewares/schedules/isRE_IdValid.middleware";
import { validateTokenMdwr } from "../middlewares/user/validateToken.middleware";
import { validateDataMdwr } from "../middlewares/validateData.middleware";
import { scheduleSchema } from "../schemas";

export const scheduleRouter = Router()

scheduleRouter.post('',
    validateTokenMdwr,
    validateDataMdwr(scheduleSchema.postRequest),
    isRE_IdValidMdwr,
    isScheduleFreeMdwr,
    isScheduleTimeValidMdwr,
    scheduleController.create
    )