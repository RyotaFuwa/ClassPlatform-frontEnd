import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import SpaceBoard from "../../components/GraphicBoard/GraphicBoard";
import Footer from "../../components/Footer/Footer";
import "./HomePage.css";

const HomePage = () => {
    return (
        <div className="page">
            <NavBar />
            <SpaceBoard />
            <Footer />
        </div>
    );
}

export default HomePage;
