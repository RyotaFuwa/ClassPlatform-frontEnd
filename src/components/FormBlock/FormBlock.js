import React, {Component} from 'react';
import './FormBlock.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";

class FormBlock extends Component {
  constructor(props) {
    super(props);
    this.state = props.params;
  }

  render() {
    return <div/>;
  }
}

export default FormBlock;
