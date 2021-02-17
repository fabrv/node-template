import { IUser, User } from './UserModels'

export class UserController {
  getUsers (): Promise<User[]> {
    return User.find()
  }

  getUser (id: number): Promise<User | undefined> {
    return User.findOne(id)
  }

  createUser (user: IUser): Promise<User> {
    return User.create(user).save()
  }
}
