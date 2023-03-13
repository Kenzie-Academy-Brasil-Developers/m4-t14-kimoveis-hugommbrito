import { AppDataSource } from "../data-source"
import { Address, Category, RealEstate } from "../entities"
import { iCategRepo } from "../interfaces/category.interface"
import { iAD_Repo, iRE_postRequest, iRE_postReturn, iRE_Repo } from "../interfaces/realEstateAddress.interface"

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

export default { create }
// import { AppDataSource } from "../data-source"
// import { Address, Category, RealEstate } from "../entities"
// import { iCategRepo } from "../interfaces/category.interface"
// import { iAD_Create, iAD_Repo, iRE_AD_Post, iRE_Create, iRE_Repo } from "../interfaces/realEstateAddress.interface"
// import realEstateAddressSchema from "../schemas/realEstateAddress.schema"

// const create = async (payload: any) => { //TIPAR O RETORNO e o PAYLOAD
//     console.log('aqui 1');
//     const addressRepository: iAD_Repo = AppDataSource.getRepository(Address)
//     const addressRequest: iAD_Create = {address: payload.address}
//     console.log('aqui 2');
//     let addressCreate = addressRepository.create(addressRequest.address) //tipar o retorno
//     const newAddress = await addressRepository.save(addressCreate)

//     const categRepository: iCategRepo = AppDataSource.getRepository(Category)
//     const category = await categRepository.findOneBy({ id: payload.categoryId })
//     console.log(category);

//     const realEstateRepository: iRE_Repo = AppDataSource.getRepository(RealEstate)
//     let realEstateRequest = payload // TIPAR
//     realEstateRequest.address = newAddress
//     realEstateRequest.category = category!
//     console.log(realEstateRequest);
//     let realEstateCreate = realEstateRepository.create(realEstateRequest) //tipar o retorno
//     console.log(realEstateCreate);

//     const newRealEstate = await realEstateRepository.save(realEstateCreate) 

//     const realEstateReturn = await realEstateRepository.findOne({
//         where: {
//             id: realEstateCreate.id
//         },
//         relations: {
//             address: true,
//             category: true
//         }
//     }) //TIPAR

//     return newRealEstate
// } 

// export default { create }