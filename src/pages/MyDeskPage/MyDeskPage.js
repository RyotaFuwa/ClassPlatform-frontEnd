import React from 'react';
import './MyDeskPage.css';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import ToDoList from "../../components/ToDoList/ToDoList";

const MyDeskPage = () => {
  return (
    <div className="page-app">
      <NavBar/>
      <div className="page-app-main mydesk">
        <h2 className='mydesk-title'>My Desk</h2>
        <div className='mydesk-to-do-list'>
          <ToDoList />
        </div>
      </div>
    </div>
  )
}

export default MyDeskPage;
