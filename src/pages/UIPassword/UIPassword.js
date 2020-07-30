import React, {Component} from 'react';
import './UIPassword.css';
import NavBar from "../../components/NavBar/NavBar";
import SpaceBoard from "../../components/GraphicBoard/GraphicBoard";
import Footer from "../../components/Footer/Footer";

const UIPassword = props => {
  return (
    <div>
      <div className="page-app">
        <NavBar/>
        <SpaceBoard className="page-app-main"/>
      </div>
      <Footer className="theme-light"/>
    </div>
  )
}
export default UIPassword;
