import React, { useState } from 'react'
import axios from 'axios'
import styled from '@emotion/styled'
import Config from './components/Config'
import Board from './components/Board'

const Container = styled.div`
  padding: 2rem;
  background-color: white;
  font-size: 1rem;
`

const url = 'http://localhost:3000'

function App () {
  const [board, setBoard] = useState([[]])
  const [game, setGame]   = useState(null)
  
  async function createGame (difficulty) {
    const game = (await axios.post(`${url}/games`, {
      difficulty,
    })).data
  
    setGame(game)
    setBoard(game.board)
  }
  
  return (
    <Container>
      <Config newGame={createGame}/>
      
      <div className="App">
        <h1 className="font-semibold text-4xl mb-4">Minesweeper</h1>
        
        {game && <Board size={game.boardSize} board={board}/>}
      </div>
    </Container>
  )
}

export default App
