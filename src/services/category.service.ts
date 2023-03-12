import { AppDataSource } from "../data-source"
import { Category } from "../entities"
import { iCategPost, iCategRepo, iCategReturned } from "../interfaces/category.interface"

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

export default { create, read }
