import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import bodyParser from 'body-parser'
import cors from 'cors'
import { indexRoutes } from './components/index/IndexRoutes'
import logger from 'morgan'
import { Sequelize } from 'sequelize'

// Database connection
const dbURL: string = process.env.DATABASE_URL ? process.env.DATABASE_URL : 'postgres://postgres:postgres@db:5432/template-db'
const sequelize = new Sequelize(dbURL)

// This logic is necessary for the docker compose to work properly
// Usually the database will take a little longer to start than the web service so a retry system is required
// This is the way Docker recommends to do it, however a timeout can be configured directly on the docker-compose.yml
function sqlConnection (maxAttempts = 5) {
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.')
  }).catch((error) => {
    console.error('Unable to connect to the database:', error)
    setTimeout(() => sqlConnection(maxAttempts - 1), 3000)
  })
}

sqlConnection()

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
