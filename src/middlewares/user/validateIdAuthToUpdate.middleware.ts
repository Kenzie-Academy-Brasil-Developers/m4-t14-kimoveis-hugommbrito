import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors";

export const validateIdAuthToUpdateMdwr = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
    if (req.user.isAdmin) {
        return next();
    }

    if (req.user.id != Number(req.params.id)) {
        throw new AppError("Insufficient permission", 403);
    }

    return next();
};
