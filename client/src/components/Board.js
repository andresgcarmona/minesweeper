import React from 'react'
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

const Board = ({ size = [10, 10], board }) => {
  let rows = []
  
  for(let i = 0; i < board.length; i++) {
    let cells = []
    
    for (let j = 0; j < board[i].length; j++) {
      cells.push(<Cell {...board[i][j]} key={`${i}-${j}`} />)
    }
    
    rows.push(<div style={{height: '22px'}} key={`${i}`}>{cells}</div>)
  }
  
  return (
    <Grid onContextMenu={(e) => e.preventDefault()}>{rows}</Grid>
  )
}

export default Board
