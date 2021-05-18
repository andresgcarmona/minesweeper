import React, { createRef } from 'react'
import styled from '@emotion/styled'
import Cell from './Cell'

const Grid = styled.div`
  display: block;
  width: auto;
  height: auto;
  background-color: transparent;
  user-select: none;
  cursor: default;
`

const Board = ({
  size = [10, 10],
  board,
}) => {
  let rows = []
  
  for (let i = 0; i < board.length; i++) {
    let cells = []
    
    for (let j = 0; j < board[i].length; j++) {
      board[i][j].ref = createRef()
      
      cells.push(<Cell {...board[i][j]}
                       key={`${i}-${j}`}
                       ref={board[i][j].ref}
                       revealNeighbors={(row, col) => floodFill(row, col, board,
                         size)}/>)
    }
    
    rows.push(<div style={{ height: '22px' }} key={`${i}`}>{cells}</div>)
  }
  
  const floodFill = (i, j, board, [rows, cols]) => {
    for (let n = -1; n <= 1; n++) {
      // Calculate and validate col position
      const col = i + n
      if (col < 0 || col >= cols) continue
      
      for (let k = -1; k <= 1; k++) {
        // Calculate and validate row position
        const row = j + k
        if (row < 0 || row >= rows) continue
        
        if (!board[col][row].revealed) {
          board[col][row].revealed = true
          board[col][row].ref.current.reveal()
        }
      }
    }
  }
  
  return (
    <Grid onContextMenu={(e) => e.preventDefault()}>{rows}</Grid>
  )
}

export default Board
