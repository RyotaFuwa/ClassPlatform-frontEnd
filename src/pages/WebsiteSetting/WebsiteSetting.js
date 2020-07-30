import React, {Component} from 'react';
import './WebsiteSetting.css';
import NavBar from "../../components/NavBar/NavBar";
import Form from "react-bootstrap/Form";
import Footer from "../../components/Footer/Footer";
import Button from "react-bootstrap/Button";
import {Header, Page} from "../../components/Page/Page";
import {Delete, Update} from "../../icons";

const Row = props => {
  return (
    <div className='row'>
      <h5>{props.title}</h5>
      {props.children}
    </div>
  )
}

// integrate redux
class WebsiteSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverLocation: 'web', // redux value
    }
  }

  render() {
    return (
      <Page>
        <Header center={<span className='title'>Website Setting</span>} />
        <Row title='API Server Location'>
          <div className='w-100 website-setting-serverLocation' name='setting'>
            <div>
              <input type="radio" name="serverLocation"
                     onChange={() => this.setState({serverLocation: 'web'})}
                     checked={this.state.serverLocation === 'web'}/>
              <label>On the Web</label>
            </div>
            <div>
              <input type="radio" name="serverLocation"
                     onChange={() => this.setState({serverLocation: 'premise'})}
                     checked={this.state.serverLocation === 'premise'}/>
              <label>On Premise</label>
            </div>
          </div>
        </Row>
        <div className='h3'>
          <button className='btn-none'><Update /></button>
          <button className='btn-none'><Delete /></button>
        </div>
      </Page>
    )
  }
}
export default WebsiteSetting;
