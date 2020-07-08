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
        const txt = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
        return (
            <div className='page-normal'>
                <NavBar />
                <div className='page-normal-main'>
                    <div className='myprofile-title'>
                        <div className='myprofile-name'>Ryota Fuwa</div>
                        <div className='myprofile-address'>RYOTA.FUWA.1428@GMAIL.COM</div>
                    </div>
                    <div className='myprofile-content'>
                        <LinkPanel className='myprofile-linkpanel'
                                   iconColor='royalblue'
                                   links={['Work Experience', 'Education', 'Projects', 'Hobbies']} />
                        <div className='myprofile-blocks'>
                            <LinkBlock title='Work Experience' line>
                                <div className='sub-1'>
                                <CollapibleBlock title='Empty'>
                                    <p>Hello World</p>
                                    <p>Hello World</p>
                                    <p>Hello World</p>
                                    <p>Hello World</p>
                                    <p>Hello World</p>
                                    <p>Hello World</p>
                                    <p>Hello World</p>
                                    <p>Hello World</p>
                                    <p>Hello World</p>
                                    <p>Hello World</p>
                                    <p>Hello World</p>
                                    <p>Hello World</p>
                                    <p>Hello World</p>
                                    <p>Hello World</p>
                                </CollapibleBlock>
                                </div>
                            </LinkBlock>
                            <LinkBlock title='Education' line>
                                <CollapibleBlock title='Empty'>
                                    <p>Hello World</p>
                                </CollapibleBlock>
                                <div className='empty-box' />
                            </LinkBlock>
                            <LinkBlock title='Projects'>
                                <div className='empty-box' />
                            </LinkBlock>
                            <LinkBlock title='Hobbies'>
                                <div className='empty-box' />
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