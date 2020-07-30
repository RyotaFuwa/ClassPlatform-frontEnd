import React, {Component} from 'react';
import './FormBlock.css';

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
