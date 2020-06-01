import React, { Component } from 'react';
import Card from "../Card/Card";
import './CardList.css';

export const CardList = props => {
    console.log(props);
    return (
        <div className="CardList">
            {props.contents.map((each) => (
                <Card key={each.id} info={each} />
                )
            )}
        </div>
    )
}
