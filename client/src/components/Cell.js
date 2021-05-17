import React from 'react'
import styled from '@emotion/styled'

const StyledCell = styled.span`
  border: 1px solid black;
  display: inline-block;
  width: 20px;
  height: 20px;
  padding: 0;
  margin: 0;
  border: 3px outset #ddd;
  background-color: #c9c9c9;
  vertical-align: middle;
  text-align: center;
  line-height: 1rem;
  font-weight: bold;
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
