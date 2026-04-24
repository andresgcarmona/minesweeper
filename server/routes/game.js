import express from 'express'
import { getGameById } from '../utils/game.js'
import gameController from '../controllers/game.js'

const router = new express.Router()

// Index of game section.
router.get('/', gameController.index)

// Create a new game.
router.post('/', gameController.create)

// Check a cell in the board.
router.post('/check', getGameById, gameController.checkCell)

// Set game as lost.
router.post('/lost', getGameById, gameController.markAsLost)

// Continue game.
router.post('/play', getGameById, gameController.playGame)

export default router
