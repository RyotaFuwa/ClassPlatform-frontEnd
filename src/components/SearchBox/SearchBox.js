import React from "react";
import "./SearchBox.css";

const SearchBox = ({onChange, placeholder}) => {
  return (
    <input className="SearchBox"
           type="search"
           placeholder={placeholder ? placeholder : "Search"}
           onChange={onChange}/>
  )
};

export default SearchBox;
