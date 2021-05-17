import React, { useState } from 'react'

const levels = [
  'beginner',
  'intermediate',
  'advanced',
  'custom',
]

const Config = ({ newGame }) => {
  const [difficulty, setDifficulty] = useState('beginner')
  
  return (
    <div className="flex flex-col items-start justify-center my-3">
      <div className="py-1">
        <select name="difficulty"
                className="py-1 px-2 rounded-sm"
                onChange={(e) => setDifficulty(e.target.value)}
                value={difficulty}>
          {levels.map((level, index) => <option
            value={level}
            key={index}>{
            level[0].toUpperCase() + level.split('').splice(1).join('')
          }</option>)}
        </select>
      </div>
      <div className="py-1">
        <button className="
          px-4
          py-1
          border
          border-gray-300
          rounded-sm
          hover:bg-gray-200
          transition"
                onClick={() => newGame(difficulty)}>
          New game
        </button>
      </div>
    </div>
  )
}

export default Config
