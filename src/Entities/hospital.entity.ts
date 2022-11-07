import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Address } from "./address.entity"
import { Professional } from "./professional.entity"

@Entity("hospital")
export class Hospital {
  @PrimaryGeneratedColumn("uuid")
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
}
