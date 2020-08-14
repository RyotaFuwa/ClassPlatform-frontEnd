import React from "react";
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Page} from "../../components/Page/Page";
import "./HomePage.css";
import Button from "@material-ui/core/Button";
import {LinearLeftUp, WaveDown} from "../../data/svgs";
import {Link} from "react-router-dom";
import {AbsoluteTop} from "../../components/Primitives/Primitives";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const Home = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Brand = styled.span`
  color: lightpink;
  text-decoration: none;
  font-weight: bolder;
  font-family: "Varela Round", sans-serif;
`

const Banner = styled.div`
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

const ShiftTop = styled.div`
  margin-top: -${props => props.by};
`

const Extend = styled.div`
  height: ${props => props.height ? props.height : null};
  width: ${props => props.width ? props.width: null};
`

const Title = styled.div`
  grid-area: title;
  font-size: 2rem;
  margin: 2rem;
  text-align: left;
  align-self: center;
`

const Links = styled.div`
  grid-area: links;
  font-size: 2rem;
  margin: 2rem;
  text-align: center;
  align-self: center;
  color: black;
`

const Content = styled.div`
  min-height: 50vh;
`

const HomePage = props => {
  return (
    <Page>
      <Home>
        <Banner>
          <Title>
            Welcome to <Brand>ClassPlatform</Brand>!
          </Title>
          <Links>
            {props.currentUser ?
              <ButtonGroup variant='text'>
                <Button>
                  <Link className='link' to='/classboard'>
                    Go to Class
                  </Link>
                </Button>
                <Button>
                  <Link className='link' to='/codingboard'>
                    Go Coding
                  </Link>
                </Button>
              </ButtonGroup> :
              <Button size='large' variant='text' disabled>
                Sign in First From Top Right Corner. <br />
              </Button>
            }
          </Links>
        </Banner>
        <ShiftTop by='10px' />
        <Extend width='110%'>
          <LinearLeftUp color={'royalblue'} />
        </Extend>

        <Content />

        <AbsoluteTop>
          <Extend width='110%'>
            <WaveDown color={'midnightblue'} />
          </Extend>
        </AbsoluteTop>
      </Home>
    </Page>
  );
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(HomePage);
