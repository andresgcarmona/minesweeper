import React, { useContext, useState } from 'react'
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
  const [board, setBoard] = useState([[]])
  const [game, setGame]   = useState(null)
  
  const gameContext = useContext(GameContext)
  
  async function createGame (difficulty) {
    setGame(null)
    
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
        <Config newGame={createGame}/>
        
        <div className="App">
          <h1 className="font-semibold text-4xl mb-4">Minesweeper</h1>
          
          {game && <Board size={game.boardSize} board={board}/>}
        </div>
      </Container>
    </GameContext.Provider>
  )
}

export default App
