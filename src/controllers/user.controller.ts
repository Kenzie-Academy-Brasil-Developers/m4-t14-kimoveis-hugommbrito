import { Request, Response } from "express";
import { User } from "../entities";
import { iUserReturned } from "../interfaces/user.interface";
import userService from "../services/user.service";

const create = async (req: Request, res: Response): Promise<Response> => {
    const newUser: iUserReturned = await userService.create(req.body)

    return res.status(201).json(newUser)
}

const readAll = async  (req: Request, res: Response): Promise<Response> => {
    const userList: User[] = await userService.readAll()
    return res.status(200).json(userList)
}

const update = async (req: Request, res: Response): Promise<Response> => {
    const updatedUser: iUserReturned = await userService.update(req.body, parseInt(req.params.id))
    return res.status(200).json(updatedUser)
}

const deleter = async (req: Request, res: Response): Promise<Response> => {
    await userService.deleter(Number(req.params.id))
    return res.status(204).send()
}

export default { create, readAll, update, deleter }