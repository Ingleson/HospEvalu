import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Professional } from "./professional.entity"
import { Schedule } from "./schedules.entity"

@Entity("service_type")
export class ServiceType {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @Column()
  name: string

  @Column("float")
  price: number

  @Column()
  duration: string

  @OneToMany((type) => Schedule, (schedule) => schedule.serviceType)
  schedules: Schedule[]

  @OneToMany((type) => Professional, (professional) => professional.serviceType)
  professional: Professional[]
}
