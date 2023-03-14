import { AppDataSource } from "../data-source";
import { RealEstate, Schedule, User } from "../entities";
import { iRE_Repo } from "../interfaces/realEstateAddress.interface";
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

export default { create }