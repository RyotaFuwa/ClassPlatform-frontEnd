import React from 'react';
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import './CodeSnippet.css';
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
      language={language === 'pseudo' ? '' : language}
      customStyle={{width: '100%'}}
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
