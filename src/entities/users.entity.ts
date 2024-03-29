import { getRounds, hashSync } from 'bcryptjs'
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ScheduleUserProperty } from './schedulesUsersProperties.entity'

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 45 })
    name: string

    @Column({ type: 'varchar', length: 45, unique: true })
    email: string

    @Column({ type: 'varchar', length: 120 })
    password: string

    @Column({ type: 'boolean', default: false })
    admin: boolean

    @CreateDateColumn({ type: 'date'})
    createdAt: string

    @UpdateDateColumn({ type: 'date'})
    updatedAt: string

    @DeleteDateColumn({ type: 'date'})
    deletedAt: string

    @OneToMany(() => ScheduleUserProperty, (schedule) => schedule.user)
    scheduleUserProperty: ScheduleUserProperty[]

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        const isEncripted = getRounds(this.password)
        if(!isEncripted){
            this.password = hashSync(this.password, 10)
        }
    }

}
