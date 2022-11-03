import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { Comment } from "./comment.entity"
import { Hospital } from "./hospital.entity"
import { Schedule } from "./schedules.entity"
import { ServiceType } from "./serviceType.entity"

@Entity("professional")
export class Professional {
  @PrimaryGeneratedColumn("uuid")
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

  @ManyToMany((type) => Schedule, (schedule) => schedule.professional, {
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
}
