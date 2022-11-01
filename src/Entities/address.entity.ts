import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm"
import { v4 as uuid } from "uuid"
import { Hospital } from "./hospital.entity"
import { User } from "./user.entity"

@Entity("address")
export class Address {
  @PrimaryColumn("uuid")
  readonly id: string

  @Column()
  state: string

  @Column()
  city: string

  @Column()
  road: string

  @Column()
  complement: string

  @Column()
  zipCode: string

  @Column()
  number: number

  @OneToOne((type) => Hospital, (hospital) => hospital.id)
  @JoinColumn()
  hospital: Hospital[]

  @OneToMany((type) => User, (user) => user.address)
  user: User[]

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
