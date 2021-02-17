import { AllowNull, Column, NotEmpty, PrimaryKey, Table } from 'sequelize-typescript'
import { Model } from 'sequelize/types'

export interface IUser {
  id: number
  firstname: string
  lastname: string
  email: string
  password: string
}

@Table({
  tableName: 'user'
})
export default class User extends Model implements IUser {
  @PrimaryKey
  @Column
  id!: number

  @AllowNull(false)
  @NotEmpty
  @Column
  firstname!: string

  @AllowNull(false)
  @NotEmpty
  @Column
  lastname!: string

  @AllowNull(false)
  @NotEmpty
  @Column
  email!: string

  @AllowNull(false)
  @NotEmpty
  @Column
  password!: string
}
