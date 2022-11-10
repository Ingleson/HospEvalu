import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { v4 as uuid } from "uuid"
import { Professional } from "./professional.entity"
import { ServiceType } from "./serviceType.entity"
import { User } from "./user.entity"

@Entity("schedules")
export class Schedule {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @Column()
  day: Date

  @Column({ type: "time" })
  hour: string

  @Column({
    length: 200,
  })
  description: string

  @ManyToOne((type) => User, (user) => user)
  user: User

  @ManyToOne((type) => Professional, (professional) => professional)
  professional: Professional

  @ManyToOne((type) => ServiceType, (serviceType) => serviceType)
  serviceType: ServiceType

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
