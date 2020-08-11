import React from 'react';
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import './CodeSnippet.css';
import googlecode from "react-syntax-highlighter/dist/cjs/styles/hljs/googlecode";
import cb from "react-syntax-highlighter/dist/cjs/styles/prism/cb";

const CodeSnippet = ({code, language}) => {
  console.log(language)
  return (
    <SyntaxHighlighter
      language={language === 'pseudo' ? 'python' : language}
      style={language === 'pseudo' ? googlecode : cb}
      showLineNumbers
    >
      {code ?
        code :
        ''
      }
    </SyntaxHighlighter>
  )
}
export default CodeSnippet;
