import React from "react";
import {connect} from 'react-redux';
import {Page} from "../../components/Page/Page";
import "./HomePage.css";
import Button from "@material-ui/core/Button";
import {LinearLeftUp, WaveDown} from "../../data/svgs";
import {AbsoluteTop, GoToButton} from "../../components/Primitives/Primitives";
import {Banner, Brand, Content, Extend, Home, Links, ShiftTop, Title} from "./components/Primitives";

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
              <>
                <GoToButton to='/classboard'>
                  Go To Class
                </GoToButton>
                <span className='ml-5 mr-5' />
                <GoToButton to='/codingboard'>
                  Go Coding
                </GoToButton>
              </> :
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
        <AbsoluteTop>
          <Extend width='110%'>
            <WaveDown color={'midnightblue'} />
          </Extend>
        </AbsoluteTop>

        <Content />

      </Home>
    </Page>
  );
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(HomePage);
