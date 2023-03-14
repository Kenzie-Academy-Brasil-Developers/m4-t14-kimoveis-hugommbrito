import { Repository } from "typeorm";
import { z } from "zod";
import { Schedule } from "../entities";
import { scheduleSchema } from "../schemas";

export type iSchedulePostRequest = z.infer<typeof scheduleSchema.postRequest>
export type iSchedulePostCreate = z.infer<typeof scheduleSchema.postCreate>
export type iScheduleReturned = z.infer<typeof scheduleSchema.returned>

export type iScheduleRepo = Repository<Schedule>