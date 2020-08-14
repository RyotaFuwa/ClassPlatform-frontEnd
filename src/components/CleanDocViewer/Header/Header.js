import React from "react";

export const Header = ({text, level}) => {
  switch(level) {
    case 1:
      return <h1><b>{text}</b></h1>
    case 2:
      return <h2><b>{text}</b></h2>
    case 3:
      return <h3><b>{text}</b></h3>
    case 4:
      return <h4 className='mt-5 mb-4'><b>{text}</b></h4>
    case 5:
      return <h5 className='mt-4 mb-3'><b>{text}</b></h5>
    case 6:
      return <h6 className='mt-3 mb-2'><b>{text}</b></h6>
    default:
      return <div />
  }
}