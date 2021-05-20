import React, {
  forwardRef, useContext, useImperativeHandle, useState, useEffect
} from 'react'
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
    ${({
  revealed,
  flagged,
}) => !revealed && !flagged ? 'background-color:' +
  ' #dee6ed' : ''};
  }
  
  ${({ flagged }) => flagged && `background-color: rgba(255, 61, 61, 0.82)`}
  ${({ revealed, neighborCount }) => (revealed && neighborCount > 0) && `
    background-color: rgb(213, 187, 191);
    border: 1px solid grey;
    padding: 2px;
  `}
  
  ${({ revealed, neighborCount }) => (revealed && neighborCount <= 0) && `
    background-color: #c9c9c9;
    border: 1px solid grey;
    padding: 2px;
  `}
`

const Cell = forwardRef(({
  row,
  col,
  isMine = false,
  neighborCount,
  revealNeighbors,
  setGameState,
  isRevealed = false,
}, ref) => {
  const [flagged, setFlagged]   = useState(false)
  const [revealed, setRevealed] = useState(false)
  
  const gameContext = useContext(GameContext)
  
  useEffect(() => {
    setRevealed(isRevealed)
  }, [isRevealed])
  
  useImperativeHandle(ref, () => ({
    async reveal() {
      await revealCell()
    }
  }))
  
  const revealCell = async() => {
    await axios.post(`${gameContext.url}/games/check`, {
      id: gameContext.game._id,
      row,
      col,
    })
  
    setRevealed(true)
  
    // Check if is a mine.
    if (isMine) {
      return setGameState('lost')
    }
    
    // Check if this is an empty cell, if so, then reveal all cells around
    // it and around its other neighbors.
    if (neighborCount === 0) {
      revealNeighbors(row, col)
    }
  }
  
  const markCell = async(e) => {
    e.preventDefault()
    
    const button = e.which || e.button
    
    // Left click.
    if (parseInt(button) === 0 && !flagged && !revealed) {
      await revealCell()
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
    neighborCount={neighborCount}
    onClick={(e) => markCell(e)}
    onContextMenu={(e) => markCell(e)}>
    {isMine ? (revealed ? '*' : '') : (revealed ? (neighborCount > 0
      ? neighborCount
      : '') : '')}
  </StyledCell>
})

export default Cell
