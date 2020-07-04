import React from 'react';
import './MyDeskPage.css';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const MyDeskPage = () => {
    return (
        <div className="page-app">
            <NavBar />
            <div className="page-app-main">
                <div className="w-100 h-100">My Desk</div>
                <button className="">Button</button>
            </div>
            <Footer className="bg-light"/>
        </div>
    )
}

export default MyDeskPage;
