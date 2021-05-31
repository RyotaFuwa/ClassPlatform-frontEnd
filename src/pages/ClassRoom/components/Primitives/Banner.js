import styled from "styled-components";

const Banner = styled.div`
  height: 52rem;
  padding: 2vh 5vw;
  grid-area: header;
  color: ${props => props.color};
  font-family: ${props => props.fontFamily};
  background-color: ${props => props.backgroundColor};
  display: grid;
  grid-gap: 3em;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr 3.5rem 3fr;
  grid-template-areas:
  "none none1 none2"
  "none3 title none4"
  "none5 info none6";
`

export default Banner;