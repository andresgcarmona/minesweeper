import React from 'react'
import styled from '@emotion/styled'
import Cell from './Cell'

const Grid = styled.div`
  display: block;
  width: auto;
  height: auto;
  background-color: transparent;
`

const createCell = (cell) => <Cell {...cell} />

const Board = ({ size = [10, 10], board }) => {
  let rows = []
  
  for(let i = 0; i < board.length; i++) {
    let cells = []
    
    for (let j = 0; j < board[i].length; j++) {
      cells.push(createCell(board[i][j]))
    }
    
    rows.push(<div style={{height: '20px'}}>{cells}</div>)
  }
  
  return (
    <Grid>{rows}</Grid>
  )
}

export default Board
