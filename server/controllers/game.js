const Game = require('../models/game')

const gameController = {
  index(req, res) {
    res.send('It works!')
  },
  
  /**
   * This function will create a new game, save it in the database and
   * return the newly created game information, including its id and board
   * generated server side.
   *
   * @param req
   * @param res
   */
  create(req, res) {
    try {
    
    }
    catch (err) {
    
    }
  }
}

module.exports = gameController
