import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import styled from 'styled-components';
import {AppPage, Page} from "../../components/Page/Page";
import "./HomePage.css";
import Button from "@material-ui/core/Button";
import {LinearRightDown, LinearRightUp, WaveDown} from "../../data/svgs";
import {Link} from "react-router-dom";
import {SignIn} from "../../components/Register/SignIn";
import {SignUp} from "../../components/Register/SignUp";
import {AbsoluteBottom, AbsoluteTop} from "../../components/Primitives/Primitives";
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
  font-family: "Tsukushi A Round Gothic", serif;
`

const Banner = styled.div`
  width: 100%;
  height: 65vh;
  padding: 5vh 10vw;
  background-color: royalblue;
  color: white;
  display: grid;
  grid-template-areas:
  "wave wave"
  "title links";
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

const HomePage = props => {
  return (
    <Page>
      <Home>
        <Banner>
          <Title>
            Welcome to <Brand>Class Platform</Brand>!
          </Title>
          <Links>
            {props.currentUser ?
              <ButtonGroup variant='text' size='large'>
                <Button>
                  <Link className='no-link' to='/classboard'>
                    Go to Class
                  </Link>
                </Button>
                <Button>
                  <Link className='no-link' to='/codingboard'>
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
        <LinearRightUp color={'royalblue'} />
        <AbsoluteTop>
          <WaveDown color={'midnightblue'} />
        </AbsoluteTop>
      </Home>
    </Page>
  );
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(HomePage);
