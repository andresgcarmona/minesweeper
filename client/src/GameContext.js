import { createContext } from 'react'

const GameContext = createContext({
  url: 'http://localhost:3000',
  game: null,
  setGame: (game) => {},
})

export default GameContext
