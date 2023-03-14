import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { AppError } from "../../errors";
import { iRE_Repo } from "../../interfaces/realEstateAddress.interface";


export const isRE_IdValidMdwr = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
    const RE_Repo: iRE_Repo = AppDataSource.getRepository(RealEstate);
    const IdExistis = await RE_Repo.findOne({
        where: {
            id: Number(req.body.realEstateId),
        },
    });

    if (!IdExistis) {
        throw new AppError("RealEstate not found", 404);
    }

    return next();
};