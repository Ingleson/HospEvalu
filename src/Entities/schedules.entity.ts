import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm"
import { v4 as uuid } from "uuid"
import { Professional } from "./professional.entity"
import { ServiceType } from "./serviceType.entity"
import { User } from "./user.entity"

@Entity("schedules")
export class Schedule {
  @PrimaryColumn("uuid")
  readonly id: string

  @Column()
  day: Date

  @Column({ type: "time" })
  hour: string

  @Column({
    length: 200,
  })
  description: string

  @ManyToOne((type) => User, (user) => user.id)
  user: User

  @ManyToOne((type) => ServiceType, (serviceType) => serviceType.id)
  serviceType: ServiceType

  @ManyToOne(type => Professional, professional => professional.id)
  professional: Professional

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
