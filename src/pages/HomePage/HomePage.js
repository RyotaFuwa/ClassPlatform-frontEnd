import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import SpaceBoard from "../../components/GraphicBoard/GraphicBoard";
import Footer from "../../components/Footer/Footer";
import "./HomePage.css";

const HomePage = () => {
    return (
        <div>
            <div className="page-app">
                <NavBar />
            </div>
                <Footer className="bg-light"/>
        </div>
);
}

export default HomePage;
