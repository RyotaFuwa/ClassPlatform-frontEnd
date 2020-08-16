import React from "react";
import './Footer.css';
import {AbsoluteBottom} from "../Primitives/Primitives";
import {LinearRightDown} from "../../data/svgs";
import {Link} from "react-router-dom";
import styled from "styled-components";

const Extend = styled.div`
  height: ${props => props.height ? props.height : null};
  width: ${props => props.width ? props.width: null};
`
function Footer() {
  return (
    <div className='footer'>
      <AbsoluteBottom>
        <Extend width='110%'>
          <LinearRightDown />
        </Extend>
      </AbsoluteBottom>
      <div className="footer-grid">
        <div className="left">&copy; All contents reserved. 2020 Ryota Fuwa</div>
        <div className="right">
          <Link className='link mr-1' to="/myprofile">My Profile</Link> |
          <a className='link ml-1'  href="#page" >Back To Page Top</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
