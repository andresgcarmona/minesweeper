import React, { useEffect, useState } from 'react'

const difficulties = [
  'beginner',
  'intermediate',
  'advanced',
  'custom',
]

const levels = {
  beginner: {
    boardSize: [10, 10],
    numMines: 9,
  },
  intermediate: {
    boardSize: [20, 20],
    numMines: 40,
  },
  advanced: {
    boardSize: [30, 30],
    numMines: 60,
  },
  custom: {
    boardSize: [10, 10],
    numMines: 9,
  },
}

const Config = ({
  createGame,
  setGameState,
  gameState,
}) => {
  const [difficulty, setDifficulty]   = useState('beginner')
  const [currentTime, setCurrentTime] = useState(0)
  const [rows, setRows]               = useState(10)
  const [cols, setCols]               = useState(10)
  const [numMines, setNumMines]       = useState(9)
  
  useEffect(() => {
    let handler
    
    if (gameState === 'playing') {
      handler = setInterval(() => {
        setCurrentTime(seconds => seconds + 1)
      }, 1000)
    }
    
    return () => clearInterval(handler)
  }, [gameState])
  
  const setGameConfig = (difficulty) => {
    setDifficulty(difficulty)
    
    setRows(levels[difficulty].boardSize[0])
    setCols(levels[difficulty].boardSize[1])
    setNumMines(levels[difficulty].numMines)
  }
  
  return (
    <div className="flex flex-col items-start justify-center my-3">
      <div className="py-1 flex">
        <div className="mr-2">
          <select name="difficulty"
                  className="py-1 px-2 rounded-sm border border-gray-200 bg-gray-100"
                  onChange={(e) => setGameConfig(e.target.value)}
                  value={difficulty}>
            {difficulties.map((level, index) => <option
              value={level}
              key={index}>{
              level[0].toUpperCase() + level.split('').splice(1).join('')
            }</option>)}
          </select>
        </div>
        
        <div className="mr-2">
          <input type="text" placeholder="rows" value={rows}
                 onChange={(e) => setRows(parseInt(e.target.value))}
                 className="border border-gray-200 px-2 py-1 bg-gray-100 disabled:bg-gray-300"
                 disabled={difficulty !== 'custom'}
                 size="2"/>
        </div>
        
        <div className="mr-2">
          <input type="text" placeholder="cols" value={cols}
                 onChange={(e) => setCols(parseInt(e.target.value))}
                 className="border border-gray-200 px-2 py-1 bg-gray-100 disabled:bg-gray-300"
                 disabled={difficulty !== 'custom'}
                 size="2"/>
        </div>
        
        <div className="mr-2">
          <input type="text" placeholder="mines" value={numMines}
                 onChange={(e) => setNumMines(e.target.value)}
                 className="border border-gray-200 px-2 py-1 bg-gray-100 disabled:bg-gray-300"
                 disabled={difficulty !== 'custom'}
                 size="2"/>
        </div>
      </div>
      
      <div className="py-1 flex items-center">
        <div className="mr-2">
          <button className="
            px-4
            py-1
            border
            border-gray-200
            rounded
            bg-gray-100
            hover:bg-gray-200
            transition"
                  onClick={() => {
                    setCurrentTime(0)
                    setGameState('new')
                    
                    createGame({
                      difficulty,
                      rows,
                      cols,
                      numMines,
                    })
                  }}>
            New game
          </button>
        </div>
        
        <div className="mr-2">
          <p>Your time: <span className="font-semibold">{currentTime}</span></p>
        </div>ga
      </div>
    </div>
  )
}

export default Config
