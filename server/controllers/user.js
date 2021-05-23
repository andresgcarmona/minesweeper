const User = require('../models/user')
const Game = require('../models/game')

/**
 * This controller groups all the user's model functionality.
 *
 * @type {{getById(*, *): Promise<void>, create(*, *): Promise<void>, listAll(*, *): Promise<*>}}
 */
const userController = {
  /**
   * List all users from database.
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async listAll (req, res) {
    const users = await User.find()
    
    return res.json(users)
  },
  
  /**
   * Creates a user and send it back to the client.
   *
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  async create (req, res) {
    try {
      const user = new User()
      
      const newUser = await user.save()
      
      res.status(201).json(newUser)
    } catch (err) {
      res.status(500).json({
        message: err.message,
      })
    }
  },
  
  async getById (req, res) {
    const { id } = req.params
    
    try {
      const user = await User.findById(id)
      user.games = await Game.find({
        user: user._id,
      })
      
      res.json(user)
    } catch (err) {
      res.status(500).json({
        message: err.message,
      })
    }
  },
}

module.exports = userController
