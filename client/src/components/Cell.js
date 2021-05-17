import React, { useState } from 'react'
import styled from '@emotion/styled'

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
  width,
  height,
  isMine = false,
}) => {
  const [flagged, setFlagged]   = useState(false)
  const [revealed, setRevealed] = useState(false)
  
  function markCell (e) {
    e.preventDefault()
    
    const button = e.which || e.button
    
    // Left click.
    if (parseInt(button) === 0 && !flagged) {
      setRevealed(true)
    }
    
    // Right click.
    if (parseInt(button) === 2) {
      setFlagged(prevFlagged => !prevFlagged)
    }
  }
  
  return <StyledCell
    width={width}
    height={height}
    isMine
    flagged={flagged}
    revealed={revealed}
    onClick={(e) => markCell(e)}
    onContextMenu={(e) => markCell(e)}/>
}

export default Cell
