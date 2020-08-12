import React, {Component} from 'react';
import ProjectFrame from '../../components/ProjectFrame/ProjectFrame';

import './MyProfilePage.css';
import LinkBlock from "../../components/LinkBlock/LinkBlock";
import LinkPanel from "../../components/LinkPanel/LinkPanel";
import CollapibleBlock from "../../components/CollapibleBlock/CollapibleBlock";
import {Page} from "../../components/Page/Page";
import UnderConstruction from "../../components/UnderConstruction/UnderConstruction";


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
      <>
        <Page>
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
                    <CollapibleBlock title={<div>Empty</div>}>
                    </CollapibleBlock>
                  </div>
                </LinkBlock>
                <LinkBlock title='Education' line>
                  <div className='sub-1'>
                    <CollapibleBlock title={<div>Empty</div>}>
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
                    <ProjectFrame title='Class Platform' />
                  </div>
                </LinkBlock>
                <LinkBlock title='Hobby' line>
                  <div className='empty-box'/>
                </LinkBlock>
              </div>
            </div>
        </Page>
        <UnderConstruction />
      </>
    )
  }
}

export default MyProfilePage;