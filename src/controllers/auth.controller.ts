import { Request, Response } from "express";
import { iAuthToken } from "../interfaces/auth.interface";
import { authService } from "../services";

const login = async (req: Request, res: Response): Promise<Response> => {

    const tokenReturned: iAuthToken = await authService.login(req.body)

    return res.status(200).json( tokenReturned )
}

export default { login }