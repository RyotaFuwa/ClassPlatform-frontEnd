import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import SpaceBoard from "../../components/GraphicBoard/GraphicBoard";
import OnePhrase from "../../components/OnePhrase/OnePhrase";
import Footer from "../../components/Footer/Footer";
import "./HomePage.css";
import signiture from "../../data/signiture.svg";

const HomePage = () => {
    return (
        <div className="Page">
            <NavBar />
            <SpaceBoard />
            {/*TODO: integration of OnePhrae component*/}
            <OnePhrase className="OnePhrase"
                random="true"/>
            <Footer/>
        </div>
    );
}

export default HomePage;
