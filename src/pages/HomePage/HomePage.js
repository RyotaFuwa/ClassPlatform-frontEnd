import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import SpaceBoard from "../../components/GraphicBoard/GraphicBoard";
import Footer from "../../components/Footer/Footer";
import "./HomePage.css";

const HomePage = () => {
    return (
        <div className="Page">
            <div className="min-vh-100 ExceptFooter">
                <NavBar />
                <SpaceBoard />
            </div>
            <Footer/>
        </div>
    );
}

export default HomePage;
