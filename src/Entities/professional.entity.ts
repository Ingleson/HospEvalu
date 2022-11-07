import { Exclude } from "class-transformer"
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
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
  @Exclude()
  password: string

  @Column()
  crm: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ default: false })
  isActive: boolean

  @OneToMany((type) => Comment, (comment) => comment.professional)
  comments: Comment[]

  @OneToMany((type) => Schedule, (schedule) => schedule.professional, {
    eager: true,
  })
  @JoinTable()
  schedules: Schedule[]

  @ManyToOne((type) => Hospital, (hospital) => hospital.professional, {
    eager: true,
  })
  hospital?: Hospital

  @ManyToOne((type) => ServiceType, (servicetype) => servicetype.professional, {
    eager: true,
  })
  serviceType: ServiceType
}
