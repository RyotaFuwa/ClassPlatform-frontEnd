import React, {useRef, useState} from 'react';
import styled from "styled-components";
import './StickyOnLeft.css';

const OuterBox = styled.div`
  position: fixed;
  top: ${props => props.top ? props.top + "vh" : "20vh"};
  right: 0em;
  height: ${props => props.top ? (100 - props.top) + "vh" : "80vh"};
  max-height: ${props => props.top ? (100 - props.top) + "vh" : "80vh"};
  margin: 0 -${props => props.width ? props.width + "vw" : "30vw"} 0 0;
  transition: margin 0.5s;
  display: grid;
  grid-gap: 0.5em;
  grid-template-columns: auto ${props => props.width ? props.width + "vw" : "30vw"};
  z-index: 9999;
`

export const InnerButton = styled.button`
  height: 5em;
  width: 2.5em;
  text-align: center;
  padding: auto;
  border: none;
  border-radius: 5px;
  transition: all 0.5s;
  background-color: ${props => props.selected ? "hsl(219, 94%, 25%)" : "hsl(219, 94%, 40%)"};
  &:hover {
    transition: transform 0.25s;
    transform: scale(1.05);
  }
`

const StickyOnLeft = {
  Box: props => {
    const [currentIdx, setIdx] = useState(null);
    const [shown, setShown] = useState(false);
    const outerBoxRef = useRef();
    const handleClick = idx => {
      setIdx(idx);
      if (currentIdx === idx || currentIdx === null) {
        outerBoxRef.current.classList.toggle('isOpen');
        setShown(!shown);
      }
    }
    return (
      <OuterBox className='sticky-on-left' ref={outerBoxRef} width={props.width} top={props.top}>
        <div className='button-list'>
          {React.Children.map(props.children, (each, i) => (
            <InnerButton
              key={i}
              color={each.color}
              selected={i === currentIdx && shown}
              onClick={() => handleClick(i)}
            >
              {each.props.name}
            </InnerButton>
          ))}
        </div>
        <div className='hidden-box'>
          <div className='inner-box'>
            {React.Children.map(props.children, (each, i) =>
              <div key={i} className='w-100 h-100' style={{display: i === currentIdx ? null : 'none'}}>
                {each}
              </div>
            )}
          </div>
        </div>
      </OuterBox>
    )
  },
  Block: props => {
    return props.children;
  }
}
export default StickyOnLeft;
