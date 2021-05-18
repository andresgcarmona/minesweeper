const express         = require('express')
const router          = new express.Router()
const { getGameById } = require('../utils/game')
const gameController  = require('../controllers/game')

// Index of game section.
router.get('/', gameController.index)

// Create a new game
router.post('/', gameController.create)

// Check a cell in the board.
router.post('/check', getGameById, gameController.checkCell)

// Set game as lost.
router.post('/lost', getGameById, gameController.markAsLost)

module.exports = router
