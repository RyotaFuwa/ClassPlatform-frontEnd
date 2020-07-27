import React from 'react';
import './MyDeskPage.css';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import ToDoList from "../../components/ToDoList/ToDoList";
import {AppPage, Header} from "../../components/Page/Page";
import UnderConstruction from "../../components/UnderConstruction/UnderConstruction";

const MyDeskPage = () => {
  return (
    <AppPage>
      <Header center={<div className='title'>My Desk</div>} />
        <div className='mydesk'>
          <ToDoList />
        </div>
      <UnderConstruction />
    </AppPage>
  )
}

export default MyDeskPage;
