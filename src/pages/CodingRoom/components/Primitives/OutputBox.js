import React from "react";
import styled from 'styled-components';

const Box = styled.pre`
  width: 100%;
  height: 100%;
  background-color: #151518;
  color: ${props => props.color}
  overflow-y: scroll;
  text-align: left;
  overflow: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const OutputBox = props => {
  const {stdout, stderr, error} = props.output;
  return (
    <Box
      className='output-box'
      color={stdout ? 'floralwhite' : 'crimson'}>
      {stdout || stderr + error}
    </Box>
  )
}

export default OutputBox;
