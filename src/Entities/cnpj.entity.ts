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

@Entity("cnpj")
export class Cnpj {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @Column()
  name: string

  @Column({ unique: true })
  cnpj: string

  @Column({default: false})
  is_active: boolean

  @OneToOne((type) => Address, (address) => address.cnpj, {
    eager: true,
  })
  @JoinColumn()
  address?: Address

  @OneToMany((type) => Professional, (professional) => professional.id)
  professional?: Professional[]
}
