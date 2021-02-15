import { Router } from 'express'
import { IndexController } from './IndexController'
import { authenticated } from '../../services/auth/authService'
import { validateQuery } from '../../services/paramValidation/paramValidationService'

export function indexRoutes (): Router {
  const router = Router()
  const indexController = new IndexController()

  router.get('/', (req, res, next) => {
    res.send({
      status: 200,
      message: 'Node Template'
    })
  })

  router.get('/sum', validateQuery(['a', 'b']), (req, res, next) => {
    res.send(indexController.sum(parseFloat(<string>req.query.a), parseFloat(<string>req.query.b)).toString())
  })

  router.get('/:name', authenticated, (req, res, next) => {
    res.status(200).send(indexController.hello(req.params.name))
  })

  return router
}
