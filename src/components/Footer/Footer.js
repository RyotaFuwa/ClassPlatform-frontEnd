import React from "react";
import './Footer.css';

function Footer() {
  return (
    <div className="page-footer">
      <div className="border-top h-100 footer-grid">
        <span className="text-dark footer-item-left">&copy; All contents reserved. 2020 Ryota Fuwa</span>
        <span className="text-dark footer-item-right">
                    |&nbsp;
          <a className="text-dark text-decoration-none" href="/myprofile">My Profile</a>
          &nbsp;|&nbsp;
          <a className="text-dark text-decoration-none" href="/aboutthiswebsite">About This Website</a>
          &nbsp;|&nbsp;
          <a className="text-dark text-decoration-none" href="/">Back To Home</a>
          &nbsp;|&nbsp;
                </span>
      </div>
    </div>
  );
}

export default Footer;
