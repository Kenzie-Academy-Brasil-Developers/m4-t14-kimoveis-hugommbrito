import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors";

export const isScheduleTimeValidMdwr = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const date = new Date(req.body.date)
    const weekDay = date.getDay()
    if(weekDay == 0 || weekDay == 6){
        throw new AppError("Invalid date, work days are monday to friday", 400)
    }

    const hour = parseInt(req.body.hour.split(':')[0])
    const minutes = parseInt(req.body.hour.split(':')[1])
    if(hour < 8 || hour > 18 || (hour == 18 && minutes > 0)){
        throw new AppError('Invalid hour, available times are 8AM to 18PM', 400)
    }

    return next()

}