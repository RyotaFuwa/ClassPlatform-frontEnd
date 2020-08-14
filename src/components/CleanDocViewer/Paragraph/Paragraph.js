import React from "react";

export const Paragraph = ({text}) => {
  return <p dangerouslySetInnerHTML={{__html: text}} />
}