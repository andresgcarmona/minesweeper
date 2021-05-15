const express = require('express')
const router  = new express.Router()

const gameController = require('../controllers/game')

// Index of game section.
router.get('/', gameController.index)

// Create a new game
router.post('/', gameController.create)

module.exports = router
