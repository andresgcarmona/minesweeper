const express        = require('express')
const router         = new express.Router()
const userController = require('../controllers/user')

// List all users.
router.get('/', userController.listAll)

// Create a new user.
router.post('/', userController.create)

// Get user info from database.
router.get('/:id', userController.getById)

module.exports = router
