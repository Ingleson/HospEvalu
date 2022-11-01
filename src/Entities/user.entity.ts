import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm"
import { v4 as uuid } from "uuid"
import { Address } from "./address.entity"
import { Comment } from "./comment.entity"
import { Schedule } from "./schedules.entity"

@Entity("users")
export class User {
  @PrimaryColumn("uuid")
  readonly id: string

  @Column({
    length: 100,
  })
  name: string

  @Column({
    length: 60,
  })
  email: string

  @Column()
  password: string

  @Column()
  isAdm: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne((type) => Address, (address) => address.id, {
    eager: true,
  })
  @JoinColumn()
  address?: Address

  @OneToMany((type) => Schedule, (schedule) => schedule.user)
  schedules: Schedule[]

  @OneToMany((type) => Comment, (comment) => comment.user)
  comment: Comment[]

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
