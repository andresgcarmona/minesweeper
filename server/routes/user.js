const express        = require('express')
const router         = new express.Router()
const userController = require('../controllers/user')

// Create a new user.
router.post('/', userController.create)

module.exports = router
