import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm"
import { v4 as uuid } from "uuid"
import { Professional } from "./professional.entity"
import { User } from "./user.entity"

@Entity("comment")
export class Comment {
  @PrimaryColumn("uuid")
  readonly id: string

  @Column()
  content: string

  @ManyToOne((type) => User, (user) => user.id)
  user: User

  @ManyToOne((type) => Professional, (professional) => professional.comments)
  professional: Professional

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
