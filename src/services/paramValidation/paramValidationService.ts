import { Request, Response, NextFunction } from 'express'

/**
 * Validates query paramateres, all parameters included in the string array must be included for it to be accepted as a valid request.
 * If the parameter condition is not meant the API will return a 400 error
 * @param params - List of query parameters to be included in the request
 */
export function validateQuery (params: string[]): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    let success = true
    for (const param of params) {
      if (req.query[param] == null) {
        next({
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
 * Validates body paramateres, if the predicate function returns any non true value the API will return a 400 error.
 * Non true truthy values will return an error
 * @param predicate - A function that accepts the request body as an argument. The validateBody() method calls the predicate function to evaluate the body.
 */
export function validateBody (predicate: (body: any) => boolean) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (predicate(req.body) === true) {
      next()
    } else {
      next({
        status: 400,
        error: 'Bad Request',
        message: 'Incorrect body format.'
      })
    }
  }
}
