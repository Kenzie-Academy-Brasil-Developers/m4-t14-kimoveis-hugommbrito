import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address } from "./addresses.entity";
import { Category } from "./categories.entity";
import { ScheduleUserProperty } from "./schedulesUsersProperties.entity";

@Entity('real_estate')
export class RealEstate{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    value: number | string

    @Column({ type: 'integer' })
    size: number

    @Column({ type: 'boolean', default: false })
    sold: boolean

    @CreateDateColumn({ type: 'text'})
    createdAt: string

    @UpdateDateColumn({ type: 'text'})
    updatedAt: string

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address

    @ManyToOne(() => Category, (category) => category.realEstate )
    category: Category

    @OneToMany(() => ScheduleUserProperty, (schedule) => schedule.realEstate)
    schedules: ScheduleUserProperty[ ]

}