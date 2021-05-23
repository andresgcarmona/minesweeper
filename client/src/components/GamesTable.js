import React from 'react'

const GameList = ({
  games,
  continueGame,
}) => {
  return <table className="border mt-5">
    <thead>
    <tr>
      <th className="border px-2 py-1">Status</th>
      <th className="border px-2 py-1">Created at</th>
      <th className="border px-2 py-1">{' '}</th>
    </tr>
    </thead>
    <tbody>
    
    {games.map((game, index) => <tr key={index}>
      <td className="border px-2 py-1">{game.state}</td>
      <td className="border px-2 py-1">{game.createdAt}</td>
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
