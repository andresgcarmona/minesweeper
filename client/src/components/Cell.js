import React from 'react'
import styled from '@emotion/styled'

const StyledCell = styled.div`
  border: 1px solid black;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`

const Cell = ({
  width,
  height,
  isMine = false,
}) => {
  return <StyledCell
    width={width}
    height={height}
    isMine/>
}

export default Cell
