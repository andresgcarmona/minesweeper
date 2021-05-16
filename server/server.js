const path     = require('path')
const express  = require('express')
const morgan   = require('morgan')
const helmet   = require('helmet')
const mongoose = require('mongoose')

const { game } = require('./routes')

require('dotenv').config({
  debug: true,
  path: path.join(__dirname + '/.env'),
})

// Create server.
const app = express()

// Middleware
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Game routes.
app.use('/games', game)

// Default routes.
app.use((req, res) => {
  res.status(404).send('404: Page not found!')
})

// Connect to database server.
mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', err => console.log(err))
db.once('open', () => {
  console.log('Connected to database.')
  
  // Open server for listening on port process.env.PORT
  app.listen(process.env.PORT,
    () => console.log(`Listening on port ${process.env.PORT}`))
})
