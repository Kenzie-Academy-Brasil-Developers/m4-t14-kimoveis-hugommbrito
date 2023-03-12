import { Request, Response } from "express"
import { Category } from "../entities"
import { iCategReturned } from "../interfaces/category.interface"
import { categoryService } from "../services"

const create = async (req: Request, res: Response): Promise<Response> => {
    const newCateg: iCategReturned = await categoryService.create(req.body)
    return res.status(201).json(newCateg)
}

const read = async (req: Request, res: Response): Promise<Response> => {
    const categList: Category[] = await categoryService.read()
    return res.status(200).json(categList)
}

export default { create, read }