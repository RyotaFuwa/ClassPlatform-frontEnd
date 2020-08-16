import React from 'react';
import styled from "styled-components";

export const Home = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const Brand = styled.span`
  color: lightpink;
  text-decoration: none;
  font-weight: bolder;
  font-family: "Varela Round", sans-serif;
`

export const Banner = styled.div`
  width: 100%;
  height: 50vh;
  padding: 5vh 10vw;
  background-color: royalblue;
  color: white;
  display: grid;
  grid-template-areas:
  "wave wave"
  "title links";
`
export const Banner2 = styled.div`
  width: 100%;
  height: 100vh;
`

export const ShiftTop = styled.div`
  margin-top: -${props => props.by};
`

export const Extend = styled.div`
  height: ${props => props.height ? props.height : null};
  width: ${props => props.width ? props.width: null};
`

export const Title = styled.div`
  grid-area: title;
  font-size: 2rem;
  margin: 2rem;
  text-align: left;
  align-self: center;
`

export const Links = styled.div`
  grid-area: links;
  font-size: 2rem;
  margin: 2rem;
  text-align: center;
  align-self: center;
  color: black;
  display: flex;
  flex-direction: row;
  z-index: 9999;
`

export const Content = styled.div`
  min-height: 50vh;
`
