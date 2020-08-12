import React from "react";
import './Footer.css';
import {AbsoluteBottom} from "../Primitives/Primitives";
import {LinearRightDown} from "../../data/svgs";
import {Link} from "react-router-dom";

function Footer() {
  return (
    <div className='footer'>
      <AbsoluteBottom>
        <LinearRightDown />
      </AbsoluteBottom>
      <div className="footer-grid">
        <div className='footer-line' />
        <span className="left">&copy; All contents reserved. 2020 Ryota Fuwa</span>
        <span className="right">
          <span className="m-1">
            <Link className='link' to="/myprofile">My Profile</Link>
          </span> |
          <span className="m-1">
            <a className='link'  href="#page" >Back To Page Top</a>
          </span>
        </span>
      </div>
    </div>
  );
}

export default Footer;
