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
