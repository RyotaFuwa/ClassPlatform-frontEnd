import React, {Component} from "react";
import "./SearchBox.css";


export const SearchBox = ({onChange}) => {
    return (
            <input className="SearchBox"
                   type="search"
                   placeholder="Search"
                   onChange={onChange} />
    )
};
