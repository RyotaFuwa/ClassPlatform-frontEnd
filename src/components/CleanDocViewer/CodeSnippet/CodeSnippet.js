import React from 'react';
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import './CodeSnippet.css';
import git from "react-syntax-highlighter/dist/cjs/styles/hljs/github";
import cb from "react-syntax-highlighter/dist/cjs/styles/prism/cb";

function decodeHTMLEntities(text) {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}

const CodeSnippet = ({code, language}) => {
  const codeText = decodeHTMLEntities(code);
  return (
    <SyntaxHighlighter
      customStyle={{marginTop: 0}}
      language={language === 'pseudo' ? '' : language}
      style={cb}
      showLineNumbers={language !== 'pseudo'}
    >
      {codeText ?
        codeText :
        ''
      }
    </SyntaxHighlighter>
  )
}
export default CodeSnippet;
