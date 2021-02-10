import { Router } from "express"
import { IndexService } from "../controllers/IndexController"
import { authenticated } from "../services/authService"
import { validateQuery } from "../services/validateQueryService"

export function indexRoutes(): Router {
  const router = Router()
  const indexService = new IndexService()  

  router.get('/', (req, res, next) => {
    res.send({
      status: 200,
      message: 'Node Template'
    })
  })

  router.get('/sum', validateQuery(['a', 'b']), (req, res, next) => {
    res.send(indexService.sum(parseInt(<string>req.query.a), parseInt(<string>req.query.b)))
  })

  router.get('/:name', authenticated, (req, res, next) => {
    res.status(200).send(indexService.hello(req.params.name))
  })  

  return router
}