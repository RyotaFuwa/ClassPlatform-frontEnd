import React from "react";
import './Footer.css';

function Footer() {
  return (
    <div className="border-top footer-grid">
      <span className="text-dark footer-item-left">&copy; All contents reserved. 2020 Ryota Fuwa</span>
      <span className="text-dark footer-item-right"> |&nbsp;
        <a className="text-dark text-decoration-none" href="/myprofile">My Profile</a> &nbsp;|&nbsp;
        <a className="text-dark text-decoration-none" href="/aboutthiswebsite">About This Website</a> &nbsp;|&nbsp;
        <a className="text-dark text-decoration-none" href="/">Back To Home</a> &nbsp;|&nbsp;
      </span>
    </div>
  );
}

export default Footer;
