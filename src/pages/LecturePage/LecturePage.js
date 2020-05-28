import React from "react";
import Pagination from 'react-bootstrap/Pagination'

class LecturePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numOfLectures: 10,
            activeLecture: 1,
            url: "",
        }
    }

    activateThisPage = () => {
    }

    getPagination = () => {
        let items = [];
        for (let number = 0; number < this.state.numOfLectures.length; number++) {
            items.push(
                <Pagination.Item onClick={this.activateThisPage()} key={number} active={number === 1}>
                    {number}
                </Pagination.Item>
            )
        }
        return (
            <div>
                <Pagination size="sm">
                    {items}
                </Pagination>
            </div>
        );
    }


    render() {
        return (
            <div>
                {this.getPagination()}
            </div>
        );
    }
}

export default LecturePage;
