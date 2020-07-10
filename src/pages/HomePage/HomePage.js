import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import SpaceBoard from "../../components/GraphicBoard/GraphicBoard";
import Footer from "../../components/Footer/Footer";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div>
      <div className="page-app">
        <NavBar/>
        <div className='page-app-main'>

          <button className='m-5' onClick={() => {
            fetch('http://192.168.2.117:3001/', {
              method: 'GET',
              headers: {'Content-Type': 'application/json'},
            })
              .then(res => res.json())
              .then(json => console.log(json.testTxt))
              .catch(rej => console.log(rej));
          }}>Hello
          </button>
        </div>
      </div>
      <Footer className="bg-light"/>
    </div>
  );
}

export default HomePage;
