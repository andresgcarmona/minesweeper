import React from 'react'

const levels = [
  'beginner',
  'intermediate',
  'advance',
  'custom',
]

const Config = () => {
  return (
    <div className="flex flex-col items-start justify-center my-3">
      <div className="py-1">
        <select name="difficulty"
          className="py-1 px-2 rounded-sm">
          { levels.map(level => <option value={level}>{
            level[0].toUpperCase()+level.split('').splice(1).join('')
          }</option> )}
        </select>
      </div>
      <div className="py-1">
        <button className="px-4 py-1 border border-gray-300 rounded-sm hover:bg-gray-200 transition">New game</button>
      </div>
    </div>
  )
}

export default Config
