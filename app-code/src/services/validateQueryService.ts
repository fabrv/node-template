import { Request, Response, NextFunction } from 'express'

export function validateQuery(params: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    let success = true
    for (const param of params) {
      if (req.query[param] == null) {
        res.status(400).send({
          status: 400,
          error: 'Bad Request',
          message: `Missing one or all of the following parameters '${params.join(', ')}'`
        })
        success = false
        break
      }
    }
    if (success) next()
  }
}

export function validateBody(predicate: (body: any) => boolean) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (predicate(req.body)) {
      next()
    } else {
      res.status(400).send({
        status: 400,
        error: 'Bad Request',
        message: `Incorrect body format.`
      })
    }
  }
}