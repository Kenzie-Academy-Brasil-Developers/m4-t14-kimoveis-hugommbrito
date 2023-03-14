import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RealEstate } from "./realEstate.entity";
import { User } from "./users.entity";

@Entity('schedules_users_properties')
export class ScheduleUserProperty{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "date" })
    date: string

    @Column({ type: "time" })
    hour: string

    @ManyToOne(() => User, (users) => users.scheduleUserProperty)
    user: User

    @ManyToOne(() => RealEstate, (realEstates) => realEstates.schedules)
    realEstate: RealEstate
}