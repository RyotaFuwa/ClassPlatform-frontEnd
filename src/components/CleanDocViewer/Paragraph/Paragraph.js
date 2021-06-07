import React from "react";

export const Paragraph = props => {
  return <p className='m-2 w-100 font-size-0100' dangerouslySetInnerHTML={{__html: props.text}} />
}