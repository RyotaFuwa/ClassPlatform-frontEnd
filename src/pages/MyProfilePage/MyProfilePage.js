import React, {Component} from 'react';
import {Card, Accordion} from 'react-bootstrap';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import ProjectFrame from '../../components/ProjectFrame/ProjectFrame';

import './MyProfilePage.css';
import LinkBlock from "../../components/LinkBlock/LinkBlock";
import LinkPanel from "../../components/LinkPanel/LinkPanel";
import ScrollBar from "../../components/ScrollBar/ScrollBar";
import CollapibleBlock from "../../components/CollapibleBlock/CollapibleBlock";


//TODO: design: one page with checkpoint links like cv, projects, etc..
//TODO: spinn
class MyProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      now: 0
    }
  }

  render() {

    return (
      <div className='page-normal'>
        <NavBar/>
        <div className='page-normal-main'>
          <div className='myprofile-title'>
            <div className='myprofile-name'>Ryota Fuwa</div>
            <div className='myprofile-address'>RYOTA.FUWA.1428@GMAIL.COM</div>
          </div>
          <div className='myprofile-content'>
            <LinkPanel className='myprofile-linkpanel'
                       iconColor='royalblue'
                       links={['Work Experience', 'Education', 'Project', 'Hobby']}/>
            <div className='myprofile-blocks'>
              <LinkBlock title='Work Experience' line>
                <div className='sub-1'>
                  <CollapibleBlock title='Empty'>
                  </CollapibleBlock>
                </div>
              </LinkBlock>
              <LinkBlock title='Education' line>
                <div className='sub-1'>
                  <CollapibleBlock title='Empty'>
                    <p>Hello World</p>
                  </CollapibleBlock>
                </div>
              </LinkBlock>
              <LinkBlock title='Project' line>
                <div className='sub-1 myprofile-project'>
                  <ProjectFrame title='C++ Programming'
                                description={['Coursework from CSC3223 at Newcastle University. ' +
                                'These projects are meant to be practices that emcompass the basic and also advance elements of C++.',
                                ' 1. Math Objects: Classes acting as mathematical operations. For example, instances of ' +
                                'Polynominal class acts as polynominal expression.',
                                ' 2. Simple 2D Board Game: Physical Simulation with chess pieces. ' +
                                'Colliison Detection is implemented with simple shapes like circle and rectangle.']}
                                github='https://github.com/RyotaFuwa/Cpp-Programming'
                                tags={['C++', 'OOP', 'Gaming']}
                  />
                  <ProjectFrame title='Gaming Graphics' />
                  <ProjectFrame title='Gaming Simulation' />
                  <ProjectFrame title='Biologically Inspired Computing' />
                  <ProjectFrame title='Simple Deep Learning Framework' />
                  <ProjectFrame title='Programming Language Kitty' />
                  <ProjectFrame title='UI Password' />
                  <ProjectFrame title='RDF Website' />
                  <ProjectFrame title='Website For Learning' />
                </div>
              </LinkBlock>
              <LinkBlock title='Hobby' line>
                <div className='empty-box'/>
              </LinkBlock>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default MyProfilePage;