import { Request, Response } from "express"
import { iScheduleReturned } from "../interfaces/schedule.interface"
import { scheduleService } from "../services"

const create = async (req: Request, res: Response): Promise<Response> => {
    const newSchedule: string = await scheduleService.create(req.body, req.user.id)
    return res.status(201).json({ message: newSchedule})
}

export default { create }