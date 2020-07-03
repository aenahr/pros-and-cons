import React from 'react';
import "./Sidebar.css";
import { elastic as Menu } from 'react-burger-menu';
import logo from '../../assets/pros-cons-logo-light.svg';

export default class Sidebar extends React.Component {
    
    render() {
        return(
            <Menu>
                <img src={logo} alt="logo" />
                <a id="home" className="menu-item" href="/">HOME</a>
                <a id="about" className="menu-item" href="/about">ABOUT</a>
                <a id="contact" className="menu-item" href="/contact">CONTACT</a>
            </Menu>
        )
    }
}