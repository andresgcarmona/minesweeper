import React from 'react'
import styled from '@emotion/styled'
import Cell from './Cell'

const Grid = styled.div`
  display: flex;
  flex: 1 1 auto;
  width: 100%;
  height: 500px;
  background-color: #ddd;
`

const Board = ({ size = [10, 10], mines = 9 }) => {
  return (
    <Grid>
    </Grid>
  )
}

export default Board
