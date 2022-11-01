import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm"
import { v4 as uuid } from "uuid"
import { Address } from "./address.entity"
import { Professional } from "./professional.entity"

@Entity("hospital")
export class Hospital {
  @PrimaryColumn("uuid")
  readonly id: string

  @Column()
  name: string

  @Column({ unique: true })
  cnpj: string

  @OneToOne((type) => Address, (address) => address.hospital, {
    eager: true,
  })
  @JoinColumn()
  address?: Address

  @OneToMany((type) => Professional, (professional) => professional.id)
  professional?: Professional[]

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
