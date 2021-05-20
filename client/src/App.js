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
  
  useEffect(() => {
    const terminateGame = async() => {
      const response = await axios.post(`${gameContext.url}/games/lost`, {
        id: game._id,
      })
      
      setBoard(response.data.board)
    }
    
    if (gameState === 'lost') terminateGame()
  }, [gameState])
  
  const gameContext = useContext(GameContext)
  
  async function createGame (gameInfo) {
    setGame(null)
    setGameState('new')
    
    const game = (await axios.post(`${gameContext.url}/games`, {
      ...gameInfo,
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
          
          {game && <Board size={game.boardSize}
                          board={board}
                          setGameState={setGameState}/>}
        </div>
      </Container>
    </GameContext.Provider>
  )
}

export default App
