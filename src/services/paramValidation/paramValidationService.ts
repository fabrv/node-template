import { Request, Response, NextFunction } from 'express'

/**
 * Validates query paramateres, all parameters included in the string array must be included for it to be accepted as a valid request.
 * If the parameter condition is not meant the API will return a 400 error
 * @param params - List of query parameters to be included in the request
 */
export function validateQuery (params: string[]) {
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

/**
 * Validates body paramateres, if the predicate function returns false or ay falsy value the API will return a 400 error.
 * @param predicate - A function that accepts the request body as an argument. The validateBody() method calls the predicate function to evaluate the body.
 */
export function validateBody (predicate: (body: any) => boolean) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (predicate(req.body)) {
      next()
    } else {
      res.status(400).send({
        status: 400,
        error: 'Bad Request',
        message: 'Incorrect body format.'
      })
    }
  }
}
