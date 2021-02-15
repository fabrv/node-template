import { Request, Response, NextFunction } from 'express'

/**
 * Middleware to validate user session
 * @param req Express Request
 * @param res Express Respnse
 * @param next Express Next Function
 */
export function authenticated (req: Request, res: Response, next: NextFunction) {
  next()

  /* To Do condition with OneLogin Oauth Access
  if (true) {
  } else {
    res.status(401).send({
      status: 401,
      error: 'Unauthorized',
      message: `Authentications is not included or has failed. ${req.method} ${req.url}`
    })
  }
  */
}

/**
 * *CAUTION* Middleware to deny all access to a route
 * @param req Express Request
 * @param res Express Respnse
 * @param next Express Next Function
 */
export function denyAll (req: Request, res: Response, next: NextFunction) {
  res.status(401).send({
    status: 401,
    error: 'Unauthorized',
    message: `Authentications is not included or has failed. ${req.method} ${req.url}`
  })
}

/**
 * Middleware to only allow access to a certain role
 * @param role The authority to require and allow access
 */
export function hasAuthority (role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    next()
  }
}
