import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Cnpj } from "./cnpj.entity"
import { User } from "./user.entity"

@Entity("address")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

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

  @OneToOne((type) => Cnpj, (cnpj) => cnpj.id)
  cnpj: Cnpj[]

  @OneToMany((type) => User, (user) => user.address)
  user: User[]
}
