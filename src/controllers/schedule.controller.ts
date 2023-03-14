import { Request, Response } from "express"
import { iRE_postReturn } from "../interfaces/realEstateAddress.interface"
import { iScheduleReturned } from "../interfaces/schedule.interface"
import { scheduleService } from "../services"

const create = async (req: Request, res: Response): Promise<Response> => {
    const newSchedule: string = await scheduleService.create(req.body, req.user.id)
    return res.status(201).json({ message: newSchedule})
}

const readByRE_Id = async (req: Request, res: Response): Promise<Response> =>{
    const RE_List: iRE_postReturn = await scheduleService.readByRE_Id(Number(req.params.id))
    return res.status(200).json(RE_List)
}

export default { create, readByRE_Id }