import { createContext } from 'react'

const GameContext = createContext({
  url: '',
  game: null,
  setGame: (game) => {},
})

export default GameContext
