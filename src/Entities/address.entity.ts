import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Hospital } from "./hospital.entity"
import { User } from "./user.entity"

@Entity("address")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  state: string

  @Column()
  city: string

  @Column()
  hood: string

  @Column()
  complement: string

  @Column()
  zipCode: string

  @Column()
  number: number

  @OneToOne((type) => Hospital, (hospital) => hospital.id)
  hospital: Hospital[]

  @OneToMany((type) => User, (user) => user.address)
  user: User[]
}
