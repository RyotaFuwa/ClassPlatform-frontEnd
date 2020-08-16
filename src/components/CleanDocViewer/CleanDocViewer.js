import React from "react";
import styled from 'styled-components';
import CodeSnippet from "./CodeSnippet/CodeSnippet";
import {Paragraph} from "./Paragraph/Paragraph";
import {Header} from "./Header/Header";
import './CleanDocViewer.css';
import {BackToTopButton} from "../Primitives/Primitives";

const Block = ({block}) => {
  const {type, data} = block;
  if(!data) return <div />;
  switch (type) {
    case 'paragraph':
      return <Paragraph text={data.text}/>
    case 'code':
      return <CodeSnippet code={data.code} language={data.language}/>
    case 'header':
      return <Header text={data.text} level={data.level}/>
    default:
      return <div />;
  }
}

const ViewerBox = styled.div`
  height: 100%;
  min-width: 200px;
  max-width: 925px;
  margin: auto;
  margin-top: 2em;
  padding: 0 1em;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-self: center;
  justify-content: center;
`

const OuterBox = styled.div`
  text-align: right;
  margin: 5em 0;
  z-index: 9999;
`

export const CleanDocViewer = ({data}) => {
  if(!data) return <div />
  if(!data.blocks) return <div />
  return (
    <ViewerBox>
      {data.blocks.map((block, idx) => <Block key={idx} block={block} />)}
      <OuterBox>
        <BackToTopButton />
      </OuterBox>
    </ViewerBox>
)
}
