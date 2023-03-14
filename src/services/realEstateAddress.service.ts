import { AppDataSource } from '../data-source'
import { Address, Category, RealEstate } from '../entities'
import { iCategRepo } from '../interfaces/category.interface'
import { iAD_Repo, iRE_postRequest, iRE_postReturn, iRE_Repo } from '../interfaces/realEstateAddress.interface'

const create = async (payload: iRE_postRequest): Promise<iRE_postReturn> => {
    const RERepo: iRE_Repo = AppDataSource.getRepository(RealEstate)
    const ADRepo: iAD_Repo = AppDataSource.getRepository(Address)
    const categRepo: iCategRepo = AppDataSource.getRepository(Category)

    const newAddress = ADRepo.create({
        ...payload.address
    })
    await ADRepo.save(newAddress)

    const RECategory = await categRepo.findOneBy({ id: payload.categoryId})

    const newRealEstate = RERepo.create({
        value: payload.value,
        size: payload.size,
        address: newAddress!,
        category: RECategory!
    })
    await RERepo.save(newRealEstate)

    return newRealEstate

}

const read = async (): Promise<iRE_postReturn[]> => {
    const RERepo: iRE_Repo = AppDataSource.getRepository(RealEstate)
    const ADRepo: iAD_Repo = AppDataSource.getRepository(Address)
    const categRepo: iCategRepo = AppDataSource.getRepository(Category)

    const realStateList = await RERepo.find({
        relations: {
            address: true,
        }
    })

    return realStateList
}

export default { create, read }
