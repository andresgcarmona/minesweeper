import express from 'express'
import userController from '../controllers/user.js'

const router = new express.Router()

// List all users.
router.get('/', userController.listAll)

// Create a new user.
router.post('/', userController.create)

// Get user info from database.
router.get('/:id', userController.getById)

export default router
