import React from 'react'

const GameList = ({
  games,
  continueGame,
}) => {
  return <table className="border mt-5">
    <thead>
    <tr>
      <th className="border px-2 py-1">Status</th>
      <th className="border px-2 py-1">Difficulty</th>
      <th className="border px-2 py-1">Rows</th>
      <th className="border px-2 py-1">Cols</th>
      <th className="border px-2 py-1">Num. mines</th>
      <th className="border px-2 py-1">Elapsed time</th>
      <th className="border px-2 py-1">Created at</th>
      <th className="border px-2 py-1">{' '}</th>
    </tr>
    </thead>
    <tbody>
    
    {games.map((game, index) => <tr key={index}>
      <td className="border px-2 py-1">{game.state}</td>
      <td className="border px-2 py-1">{game.difficulty}</td>
      <td className="border px-2 py-1 text-center">{game.boardSize[0]}</td>
      <td className="border px-2 py-1 text-center">{game.boardSize[1]}</td>
      <td className="border px-2 py-1 text-center">{game.mines}</td>
      <td className="border px-2 py-1 text-right">{game.elapsedTime}</td>
      <td className="border px-2 py-1 text-right">{(new Date(game.createdAt)).toLocaleString()}</td>
      <td className="border px-2 py-1">{game.state === 'new' || game.state ===
      'playing' || game.state === 'paused'
        ? <button
          className="px-3 py-2 border rounded bg-gray-100 hover:bg-gray-200 transition"
          onClick={() => continueGame(game)}>Continue</button>
        : ''}</td>
    </tr>)}
    
    </tbody>
  </table>
}

export default GameList
