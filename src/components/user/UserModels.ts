import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export interface IUser {
  id?: number
  firstname: string
  lastname: string
  email: string
  password: string
}

@Entity()
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  firstname!: string

  @Column()
  lastname!: string

  @Column()
  email!: string

  @Column()
  password!: string
}
