import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors";

export const validateIdAuthToUpdateMdwr = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { id, admin } = req.user;

    if (!admin && id != Number(req.params.id)) {
        throw new AppError("Insufficient permission", 403);
    }

    return next();
};
