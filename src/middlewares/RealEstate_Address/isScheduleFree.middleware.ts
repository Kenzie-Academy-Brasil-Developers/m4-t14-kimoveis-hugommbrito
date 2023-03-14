import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Schedule } from "../../entities";
import { AppError } from "../../errors";
import { iScheduleRepo } from "../../interfaces/schedule.interface";

export const isScheduleFreeMdwr = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
    const scheduleRepo: iScheduleRepo = AppDataSource.getRepository(Schedule)

    // const date = req.body.date.replace('/','-').replace('/','-')
    const date = req.body.date
    const hour = req.body.hour
    console.log(date);
    console.log(hour);

    const realEstateId: number = req.body.realEstateId
    const RE_Schedules = await scheduleRepo.createQueryBuilder('schedules_users_properties')
        .innerJoinAndSelect('schedules_users_properties.realEstate', 'realEstate')
        .where( `realEstate.id = '${realEstateId}'`)
        .getMany()

    console.log(RE_Schedules);
    RE_Schedules.forEach(schedule => {
        if(schedule.date == date && schedule.hour == hour){
            throw new AppError('Schedule to this real estate at this date and time already exists', 409)
        }
        
    })
    
    const userEstateId: number = req.user.id
    const userSchedules = await scheduleRepo.createQueryBuilder('schedules_users_properties')
    .innerJoinAndSelect('schedules_users_properties.user', 'user')
    .where( `user.id = '${userEstateId}'`)
    .getMany()
    
    userSchedules.forEach(schedule => {
        if(schedule.date == date && schedule.hour == hour){
            throw new AppError('User schedule to this real estate at this date and time already exists', 409)
        }

    })

    return next()

}