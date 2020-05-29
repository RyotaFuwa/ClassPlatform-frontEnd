import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import SpaceBoard from "../../components/GraphicBoard/GraphicBoard";
import Footer from "../../components/Footer/Footer";
import "./HomePage.css";
import signiture from "../../data/signiture.svg";

const HomePage = () => {
    return (
        <div className="Page">
            <NavBar />
            <div className="Page">
                <SpaceBoard />
                <h1>Let's Take Care Of The Environment  :)</h1>
                <img src={signiture} className="Signiture" alt="logo" />
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;
