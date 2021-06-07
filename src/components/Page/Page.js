import React, {Component} from 'react';
import './Page.css';
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

const Page = props => {
    return (
      <div className='normal-page' id='page'>
        <NavBar />
        <div className='main'>
          {props.children}
        </div>
        {!props.removeFooter && <Footer/> }
      </div>
    )
}

const AppPage = props => {
  return (
    <div className="app-page" id='page'>
      <NavBar />
      <div className="main">
        {props.children}
      </div>
    </div>
  )
}

const Header = props => {
  return (
    <div className='header'>
      <div className='left'>
        {props.left}
      </div>
      <div className='center'>
        {props.center}
      </div>
      <div className='right'>
        {props.right}
      </div>
    </div>
  )
}

export {Page, AppPage, Header}
