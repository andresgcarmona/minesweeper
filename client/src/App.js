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
  const [board, setBoard]       = useState([[]])
  const [game, setGame]         = useState(null)
  const [gameOver, setGameOver] = useState(false)
  
  useEffect(() => {
    const terminateGame = async() => {
      const response = await axios.post(`${gameContext.url}/games/lost`, {
        id: game._id,
      })
  
      setBoard(response.data.board)
    }
    
    if (gameOver) terminateGame()
  }, [gameOver])
  
  const gameContext = useContext(GameContext)
  
  async function createGame (difficulty) {
    setGame(null)
    setGameOver(false)
    
    const game = (await axios.post(`${gameContext.url}/games`, {
      difficulty,
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
        <Config newGame={createGame} hasLost={gameOver} />
        
        <div className="App">
          <h1 className="font-semibold text-4xl mb-4">Minesweeper</h1>
          
          {gameOver && <div className="text-red-500 font-bold mb-4">You lost! :(</div> }
          
          {game && <Board size={game.boardSize}
                          board={board}
                          setGameOver={setGameOver}/>}
        </div>
      </Container>
    </GameContext.Provider>
  )
}

export default App
