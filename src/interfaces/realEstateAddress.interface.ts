import { Repository } from "typeorm";
import { z } from "zod";
import { Address, RealEstate } from "../entities";
import realEstateAdressSchema from "../schemas/realEstateAddress.schema";

export type iAD_post = z.infer<typeof realEstateAdressSchema.AD_post>;
export type iAD_postReturn = z.infer<typeof realEstateAdressSchema.AD_postReturn>;
export type iRE_postRequest = z.infer<typeof realEstateAdressSchema.RE_postRequest>;
export type iRE_postCreate = z.infer<typeof realEstateAdressSchema.RE_postCreate>;
export type iRE_postReturn = z.infer<typeof realEstateAdressSchema.RE_postReturn>;

export type iRE_Repo = Repository<RealEstate>;
export type iAD_Repo = Repository<Address>;
