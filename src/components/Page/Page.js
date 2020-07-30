import React, {Component} from 'react';
import './Page.css';
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

const Page = props => {
    return (
      <div className='normal-page'>
        <NavBar />
        <div className='main'>
          {props.children}
        </div>
        <div className='footer'>
          <Footer />
        </div>
      </div>
    )
}

const AppPage = props => {
  return (
    <div className="app-page">
      <NavBar />
      <div className="main">
        {props.children}
      </div>
    </div>
  )
}

const Header = props => {
  return (
    <div className='page-header'>
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
