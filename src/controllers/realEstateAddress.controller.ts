import { Request, Response } from "express"
import { realEstateAddressService } from "../services"

const create = async (req: Request, res: Response): Promise<Response> => {
    const newRealEstate = await realEstateAddressService.create(req.body) //TIPAR
    return res.status(201).json(newRealEstate)
}

export default { create }