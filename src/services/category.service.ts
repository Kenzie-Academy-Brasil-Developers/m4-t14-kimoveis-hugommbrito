import { AppDataSource } from '../data-source'
import { Category, RealEstate } from '../entities'
import { iCategPost, iCategRepo, iCategReturned } from '../interfaces/category.interface'
import { iRE_Repo } from '../interfaces/realEstateAddress.interface'

const create = async (payload: iCategPost): Promise<iCategReturned> => {
    const categRepository: iCategRepo = AppDataSource.getRepository(Category)
    let newCateg: Category = categRepository.create(payload)

    const createdCateg: iCategReturned =  await categRepository.save(newCateg)

    return createdCateg
} 

const read = async (): Promise<Category[]> => {
    const categRepository: iCategRepo = AppDataSource.getRepository(Category)
    let categList: Category[] = await categRepository.find()
        
    return categList

}

const readById = async (categId: number): Promise<iCategReturned> => {
    const RERepo: iRE_Repo = AppDataSource.getRepository(RealEstate)
    const categRepo: iCategRepo = AppDataSource.getRepository(Category)

    const CategoryWithRE = await categRepo.findOne({
        where: {
            id: categId
        },
        relations: {
            realEstate: true
        }
    })

    return CategoryWithRE!

}

export default { create, read, readById }
