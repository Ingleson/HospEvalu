import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm"
import { v4 as uuid } from "uuid"
import { Comment } from "./comment.entity"
import { Hospital } from "./hospital.entity"
import { Schedule } from "./schedules.entity"
import { ServiceType } from "./serviceType.entity"

@Entity("professional")
export class Professional {
  @PrimaryColumn("uuid")
  readonly id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  crm: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ default: false })
  isActive: boolean

  @OneToMany((type) => Comment, (comment) => comment.professional, {
    eager: true,
  })
  comments: Comment[]

  @OneToMany((type) => Schedule, (schedule) => schedule.professional, {
    eager: true,
  })
  schedules: Schedule[]

  @ManyToOne((type) => Hospital, (hospital) => hospital.professional, {
    eager: true,
  })
  hospital?: Hospital

  @ManyToOne((type) => ServiceType, (servicetype) => servicetype, {
    eager: true,
  })
  serviceType: ServiceType

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
