import { Request, Response } from "express"
import { Category } from "../entities"
import { iCategReturned } from "../interfaces/category.interface"
import { iRE_postReturn } from "../interfaces/realEstateAddress.interface"
import { categoryService } from "../services"

const create = async (req: Request, res: Response): Promise<Response> => {
    const newCateg: iCategReturned = await categoryService.create(req.body)
    return res.status(201).json(newCateg)
}

const read = async (req: Request, res: Response): Promise<Response> => {
    const categList: Category[] = await categoryService.read()
    return res.status(200).json(categList)
}

const readById = async (req: Request, res: Response): Promise<Response> => {
    const REList: iCategReturned = await categoryService.readById(Number(req.params.id))
    return res.status(200).json(REList)
}

export default { create, read, readById }