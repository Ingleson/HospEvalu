import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { v4 as uuid } from "uuid"
import { Professional } from "./professional.entity"
import { Schedule } from "./schedules.entity"

@Entity("service_type")
export class ServiceType {
  @PrimaryColumn("uuid")
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

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
