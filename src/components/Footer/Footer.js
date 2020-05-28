import React from "react";
import './Footer.css';

function Footer() {
    return (
        <div className="Footer">
            <div id="separate-line"></div>
            <div id="Footer-contents">
                <span id="Copy-right">&copy; All contents reserved. 2020 Ryota Fuwa</span>
                <span id="Footer-links">
                    |&nbsp;
                    <a className="Footer-button" href="/myprofile">My Profile</a> &nbsp;
                    &nbsp;|&nbsp;
                    <a className="Footer-button" href="/aboutthisebsite">About This Website</a> &nbsp;
                    |
                    <a className="Footer-button" href="/">Back To Home</a> &nbsp;
                    | &nbsp;
                </span>
            </div>
        </div>
    );
}

export default Footer;
