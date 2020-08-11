import React from "react";
import CodeSnippet from "./CodeSnippet/CodeSnippet";
import {Paragraph} from "./Paragraph/Paragraph";
import {Header} from "./Header/Header";
import './CleanDocViewer.css';


const Block = ({block}) => {
  const {type, data} = block;
  switch (type) {
    case 'paragraph':
      return <Paragraph text={data.text}/>
    case 'code':
      return <CodeSnippet code={data.code} language={data.language}/>
    case 'header':
      return <Header text={data.text} level={data.level}/>
    default:
      return <div/>;
  }
}

export const CleanDocViewer = ({data}) => {
  if(!data) return <div />
  if(!data.blocks) return <div />

  return (
    <div>
      <div className='clean-doc-viewer'>
        {data.blocks.map((block, idx) => <Block key={idx} block={block} />)}
      </div>
    </div>
  )
}
