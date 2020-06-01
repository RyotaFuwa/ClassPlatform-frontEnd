import React, {Component} from "react";
import {ProgressBar} from "react-bootstrap";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import "./MyProfilePage.css";


//TODO: design: one page with checkpoint links like cv, projects, etc..
//TODO: spinn
class MyProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            now: 0
        }
    }
    onScroll = () => {
        this.setState(state => {
            return {now: window.scrollY}
        })
    }
    render() {
        return (
            <div onScroll={this.onScroll}>
                <NavBar/>
                <ProgressBar variant="secondary"
                             now={this.state.now}
                             max={document.body.offsetHeight}
                             style={{position: "sticky", top: "0"}}
                />
                <div className="MyProfile">
                    <p>
                        <a href="#">top</a> ・
                        <a href="#myprofile-education">education</a> ・
                        <a href="#myprofile-projects">projects</a> ・
                        <a href="#myprofile-hobbies">hobbies</a>
                    </p>
                    <h1>My Profile</h1>
                    <h4><a href="#">Contact</a> / <a href="#">Linkdn</a> / <a href="#">GitHub</a></h4>
                    <div id="myprofile-education"></div>
                    <div id="myprofile-projects"></div>
                    <div id="myprofile-hobbies"></div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default MyProfilePage;