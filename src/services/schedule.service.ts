import { AppDataSource } from "../data-source";
import { RealEstate, Schedule, User } from "../entities";
import { iRE_postReturn, iRE_Repo } from "../interfaces/realEstateAddress.interface";
import { iSchedulePostRequest, iScheduleRepo, iScheduleReturned } from "../interfaces/schedule.interface";
import { iUserRepo } from "../interfaces/user.interface";

const create = async (payload: iSchedulePostRequest, userId: number): Promise<string> => {
    const userRepo: iUserRepo = AppDataSource.getRepository(User)
    const RERepo: iRE_Repo = AppDataSource.getRepository(RealEstate)
    const scheduleRepo: iScheduleRepo = AppDataSource.getRepository(Schedule)

    const scheduleUser = await userRepo.findOneBy({ id: userId })
    const scheduleRE = await RERepo.findOneBy({ id: payload.realEstateId })

    const newSchedule = scheduleRepo.create({
        date: payload.date,
        hour: payload.hour,
        user: scheduleUser!,
        realEstate: scheduleRE!
    })
    await scheduleRepo.save(newSchedule)

    return 'Schedule created'

}

const readByRE_Id = async (RE_Id: number): Promise<iRE_postReturn> => {
    const RE_Repo: iRE_Repo = AppDataSource.getRepository(RealEstate)
    const RESchedules = await RE_Repo.findOneOrFail({
        where:{
            id: RE_Id
        },
        relations:{
            address: true,
            category: true,
            schedules:{
                user: true
            },
        },
    })

    return RESchedules
}

export default { create, readByRE_Id }
