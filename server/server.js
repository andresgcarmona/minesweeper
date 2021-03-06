const path     = require('path')
const express  = require('express')
const morgan   = require('morgan')
const helmet   = require('helmet')
const mongoose = require('mongoose')
const cors     = require('cors')

const { games, users } = require('./routes')

require('dotenv').config({
  debug: true,
  path: path.join(__dirname + '/.env'),
})

// Create server.
const app = express()

// Middleware
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Game routes.
app.use('/games', games)

// Users routes.
app.use('/users', users)

// Default routes.
app.use((req, res) => {
  res.status(404).send('404: Page not found!')
})

// Connect to database server.
mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_DATABASE}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

const db = mongoose.connection

// Error and open event listeners.
db.on('error', err => console.log(err))

db.once('open', () => {
  console.log('Connected to database.')
  
  // Open server for listening on port process.env.PORT
  app.listen(process.env.PORT,
    () => console.log(`Listening on port ${process.env.PORT}`))
})
