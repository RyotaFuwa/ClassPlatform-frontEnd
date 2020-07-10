import React from 'react';
import './MyDeskPage.css';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const MyDeskPage = () => {
  return (
    <div className="page-app">
      <NavBar/>
      <div className="page-app-main mydesk">
      </div>
    </div>
  )
}

export default MyDeskPage;
