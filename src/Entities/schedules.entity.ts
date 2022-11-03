import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm"
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

  @ManyToMany((type) => User, (user) => user.id)
  @JoinTable()
  user: User

  @ManyToMany((type) => Professional, (professional) => professional.id)
  @JoinTable()
  professional: Professional

  @ManyToOne((type) => ServiceType, (serviceType) => serviceType.id)
  serviceType: ServiceType

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
