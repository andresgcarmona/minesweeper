import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import styled from '@emotion/styled'
import Config from './components/Config'
import Board from './components/Board'
import GameContext from './GameContext'

const url = 'http://localhost:3000'

const Container = styled.div`
  padding: 2rem;
  background-color: white;
  font-size: 1rem;
`

function App () {
  const [board, setBoard]         = useState([[]])
  const [game, setGame]           = useState(null)
  const [gameState, setGameState] = useState('pending')
  const [user, setUser]           = useState(null)
  
  // Use game context to access global variables.
  const gameContext = useContext(GameContext)
  
  /**
   * Create a new synthetic user when the app is opened in a new browser.
   */
  useEffect(() => {
    let storedUser = localStorage.getItem('user')
    
    const createUser = async() => {
      try {
        const { data } = await axios.post(`${gameContext.url}/users`)
  
        // Store the user in localStorage and state.
        localStorage.setItem('user', JSON.stringify(data))
        setUser(data)
      }
      catch (err) {
        console.log(err)
      }
    }
    
    // If the is no user, then call the API to create one.
    if (!storedUser) {
      createUser()
    }
    else {
      setUser(JSON.parse(storedUser))
    }
  }, [])
  
  /**
   * Check if gameState changes, if so, then act on the current game's state.
   */
  useEffect(() => {
    const terminateGame = async() => {
      const response = await axios.post(`${gameContext.url}/games/lost`, {
        id: game._id,
      })
      
      setBoard(response.data.board)
    }
    
    if (gameState === 'lost') terminateGame()
  }, [gameState])
  
  /**
   * Calls the API to create a new game.
   *
   * @param gameInfo
   * @returns {Promise<void>}
   */
  async function createGame (gameInfo) {
    setGame(null)
    setGameState('new')
    
    const game = (await axios.post(`${gameContext.url}/games`, {
      ...gameInfo,
      user,
    })).data
    
    setGame(game)
    setBoard(game.board)
  }
  
  return (
    <GameContext.Provider value={{
      game,
      setGame,
      url,
    }}>
      <Container className="container">
        <Config createGame={createGame}
                gameState={gameState}
                setGameState={setGameState}/>
        
        <div className="App">
          <h1 className="font-semibold text-4xl mb-4">Minesweeper</h1>
          
          {gameState === 'lost' &&
          <div className="text-red-500 font-bold mb-4">You lost! :(</div>}
          
          {!game && <p className="mb-4">Click the <strong>New game</strong> button to start a new game.</p>}
          
          {game && <Board size={game.boardSize}
                          board={board}
                          setGameState={setGameState}/>}
          
          <hr/>
          
          {user && user.game && <div className="my-8">
            <h1 className="font-semibold text-3xl">Your previous games.</h1>
          </div>}
        </div>
      </Container>
    </GameContext.Provider>
  )
}

export default App
