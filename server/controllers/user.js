const User = require('../models/user')
/**
 * This controller groups all the user's model functionality.
 *
 * @type {{create(*, *): Promise<void>}}
 */
const userController = {
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
}

module.exports = userController
