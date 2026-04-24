import path from 'path'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { games, users } from './routes/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({
  debug: true,
  path: path.join(process.cwd(), '.env'),
})

// Create server.
const app = express()

// Middleware.
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Game routes.
app.use('/games', games)

// Users routes.
app.use('/users', users)

if (process.env.NODE_ENV === 'production') {
  const clientDistPath = path.resolve(process.cwd(), '../client/dist')

  app.use(express.static(clientDistPath))
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'))
  })
} else {
  // Default routes.
  app.use((req, res) => {
    res.status(404).send('404: Page not found!')
  })
}

// Connect to database server.
mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

// Error and open event listeners.
db.on('error', (err) => console.log(err))

db.once('open', () => {
  console.log('Connected to database.')

  // Open server for listening on port process.env.PORT.
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
  })
})
