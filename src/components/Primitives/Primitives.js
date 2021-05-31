import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import './Primitives.css';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";


export const Dialogs = styled.div`
`

export const GoToButton = props => {
  return (
  <Button variant={props.variant ? props.variant : 'outlined'}>
    <Link className='link' to={props.to ? props.to : '/'}>
      {props.children}
    </Link>
  </Button>
  )
}

const InnerLink = styled.a`
  text-decoration: none;
  color: black;
  font-size: 1em;
  border-radius: 0.1em;
  background-color: transparent;
  border: 1px solid black;
  justify-self: center;
  padding: 0.25em 1em;
  &:hover {
    color: lightgray;
    text-decoration: none;
  }
`

export const BackToTopButton = () => (
    <InnerLink href='#page'>
      Back To Top
    </InnerLink>
)

export const AbsoluteTop = styled.div`
  width: 100%;
  height: auto;
  position: absolute;
  top: 0
`

export const AbsoluteBottom = styled.div`
  width: 100%;
  height: auto;
  position: absolute;
  bottom: 0;
`

export const Content = {
  Content: styled.div`
    max-width: 82rem;
    width: 80vw;
    margin: 10rem auto;
    padding: 1rem;
  `,
  Description: styled.div`
    border: 2px solid darkblue;
    border-radius: 4px;
    width: 100%;
    padding: 1rem;
    color: black;
    font-size: 1.4rem;
    font-weight: 400;
    box-shadow: 1rem 1rem 2rem #cccccc;
    transition: all .25s;
    text-decoration: none;
    &:hover {
      box-shadow: 4px 4px 8px #777777;
      background-color: royalblue;
      color: white;
    }
  `,
  Header: styled.h1`
    padding: 1rem;
    margin: 0 1rem;
  `
}
