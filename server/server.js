const path    = require('path')
const express = require('express')
const morgan  = require('morgan')
const helmet  = require('helmet')

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

// Default routes.
app.use((req, res) => {
  res.status(404).send('404: Page not found!')
})

// Open server for listening on port process.env.PORT
app.listen(process.env.PORT,
  () => console.log(`Listening on port ${process.env.PORT}`))
