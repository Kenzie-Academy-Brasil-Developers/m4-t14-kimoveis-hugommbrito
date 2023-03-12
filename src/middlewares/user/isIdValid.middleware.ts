import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { iUserRepo } from "../../interfaces/user.interface";

export const isIdValidMdwr = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: iUserRepo = AppDataSource.getRepository(User);
  const IdExistis = await userRepository.findOne({
    where: {
      id: Number(req.params.id),
    },
  });

  if (!IdExistis || IdExistis.deletedAt) {
    throw new AppError("User not found", 404);
  }

  return next();
};
