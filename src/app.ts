import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import bodyParser from 'body-parser'
import cors from 'cors'
import { indexRoutes } from './components/index/IndexRoutes'
import logger from 'morgan'
import 'reflect-metadata'

const app = express()
// Usings for the app
app.use(logger('dev'))
app.use(cors())
app.use(cookieParser())
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use('/', indexRoutes())

// 505 Error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (error?.status != null) {
    res.status(error.status).send(error)
  } else {
    console.error(error)
    res.status(500).send({
      status: 500,
      error: 'Internal Server Error',
      message: error.message
    })
  }
})

// 404 Error handler
app.use((req: express.Request, res: express.Response) => {
  res.status(404).send({
    status: 404,
    error: 'Resource Not Found',
    message: `The requested resource is not available. ${req.method} ${req.url}`
  })
})

export default app
