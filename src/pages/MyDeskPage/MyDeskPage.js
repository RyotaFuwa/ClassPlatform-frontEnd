import React, {Component} from 'react';
import './MyDeskPage.css';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const MyDeskPage = props => {
    return (
        <div>
            <NavBar />
            <h1>MyDeskPage</h1>
            <Footer />
        </div>
    )
}

export default MyDeskPage;
