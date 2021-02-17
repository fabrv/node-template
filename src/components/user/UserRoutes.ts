import { Router } from 'express'
import { validateBody } from '../../utils/paramValidation/paramValidation'
import { UserController } from './UserControllers'
import { IUser } from './UserModels'

export function userRoutes (): Router {
  const router = Router()
  const userController = new UserController()

  router.get('/', async (_req, res, next) => {
    try {
      const users = await userController.getUsers()
      res.send(users)
    } catch (error) {
      next(error)
    }
  })

  router.get('/:id', async (req, res, next) => {
    try {
      const user = await userController.getUser(parseInt(req.params.id))
      res.send(user)
    } catch (error) {
      next(error)
    }
  })

  router.post('/', validateBody((body) => {
    return (body.firstname && body.lastname && body.email && body.password) != null
  }), async (req, res, next) => {
    const user: IUser = req.body
    try {
      const created = await userController.createUser(user)
      res.send(created)
    } catch (error) {
      next(error)
    }
  })

  return router
}
