import { IUser, User } from './UserModels'

export class UserController {
  getUsers () {
    return User.find()
  }

  getUser (id: number) {
    return User.findOne(id)
  }

  createUser (user: IUser) {
    return User.create(user).save()
  }
}
