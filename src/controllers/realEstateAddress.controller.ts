import { Request, Response } from "express"
import { RealEstate } from "../entities"
import { iRE_postReturn } from "../interfaces/realEstateAddress.interface"
import { realEstateAddressService } from "../services"
import categoryController from "./category.controller"

const create = async (req: Request, res: Response): Promise<Response> => {
    const newRealEstate = await realEstateAddressService.create(req.body) //TIPAR
    return res.status(201).json(newRealEstate)
}

const read = async (req: Request, res: Response): Promise<Response> => {
    const REList: iRE_postReturn[] = await realEstateAddressService.read()
    return res.status(200).json(REList)
}

export default { create, read }