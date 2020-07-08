import React, {Component} from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import ClassList from "../../components/ClassList/ClassList";
import SearchBox from "../../components/SearchBox/SearchBox";
import "./ClassRoom.css";
import Button from "react-bootstrap/Button";

class ClassRoomSession extends Component {
    constructor(props) {
        super(props);

        //sample implementation
        let sampleClass = {
            title: "Coding Camp 2020",
            description: "Practice Coding & Algorithm Questions!",
            imageSrc: "https://evatronix.com/images/en/offer/product-design/product-development/Evatronix_Algorithm_development_and_analysis_01_1920x1080.jpg",
            link: "#",
        };
        const classes = [];
        for(let i = 0; i < 15; i++) {
           classes.push(sampleClass);
        }
        this.state = {
            searchSubstring: "",
            classes: classes,
        }
    }

    createClass() {
        console.log('nothing yet');
    }

    render() {
        let matchedClasses = this.getMatchedClasses();
        return (
            <div className="page-normal">
                <NavBar/>
                <div className="page-normal-main">
                    <div className="classroom-header">
                        <h2 className="classroom-title">
                            Class Room &nbsp;
                            {true && <Button onClick={() => this.createClass()}> + </Button>}
                        </h2>
                        <div className="classroom-searchbox">
                            <SearchBox onChange={e => this.setState({searchSubstring: e.target.value})} />
                        </div>
                    </div>
                    <ClassList classes={matchedClasses}/>
                </div>
                <Footer/>
            </div>
        )
    }
    getMatchedClasses = () => {
        let pattern = this.state.searchSubstring.toLowerCase();
        let matchedClasses = this.state.classes.filter(each =>
            each.title.toLowerCase().includes(pattern));
        return matchedClasses;
    }
}

export default ClassRoomSession;
