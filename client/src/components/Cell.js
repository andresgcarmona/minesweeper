import React, { useState, useContext } from 'react'
import GameContext from '../GameContext'
import styled from '@emotion/styled'
import axios from 'axios'

const StyledCell = styled.span`
  border: 1px solid black;
  display: inline-block;
  width: 22px;
  height: 22px;
  padding: 0;
  margin: 0;
  border: 3px outset #ddd;
  background-color: #c9c9c9;
  vertical-align: middle;
  text-align: center;
  line-height: 1rem;
  font-weight: bold;
  
  &:hover {
    ${({ revealed, flagged }) => !revealed && !flagged ? 'background-color:' +
  ' #dee6ed' : ''};
  }
  
  ${({ flagged }) => flagged && `background-color: rgba(255, 61, 61, 0.82)`}
  ${({ revealed }) => revealed && `
    background-color: rgb(213, 187, 191);
    border: 1px solid grey;
    padding: 2px;
  `}
`

const Cell = ({
  row,
  col,
  isMine = false,
}) => {
  const [flagged, setFlagged]   = useState(false)
  const [revealed, setRevealed] = useState(true)
  
  const gameContext = useContext(GameContext)
  
  async function markCell (e) {
    e.preventDefault()
    
    const button = e.which || e.button
    
    // Left click.
    if (parseInt(button) === 0 && !flagged) {
      const response = await axios.post(`${gameContext.url}/games/check`, {
        id: gameContext.game._id,
        row,
        col,
      })
      
      setRevealed(true)
    }
    
    // Right click.
    if (parseInt(button) === 2) {
      setFlagged(prevFlagged => !prevFlagged)
    }
  }
  
  return <StyledCell
    isMine
    flagged={flagged}
    revealed={revealed}
    onClick={(e) => markCell(e)}
    onContextMenu={(e) => markCell(e)}>
    {isMine ? '*' : ''}
  </StyledCell>
}

export default Cell
