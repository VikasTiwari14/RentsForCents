import React, { useState,useEffect } from 'react'
import bike from "../../images/bike1.jpg";
import logo from "../../images/RentForCentsLogo.png";
import "./MainPage.css"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {FiArrowRight} from "react-icons/fi"
import Home from './Home/Home';
import About from './About/About';
import Contact from './Contact/Contact';
import {FaFacebookF} from "react-icons/fa";


const MainPage = () => {
    const [id, setId] = useState("home");
    const handleNavBar = (e) => {
        setId(e.target.id)
    }
    const showSection = () => {
        switch(id){
            case "home":return    <Home/>
            case "about":return   <About/>
            case "contact":return <Contact/>
        }
    }
    
    return(
        <div className="MainPage">
            <div className="NavBarContainer">
                <div className="NavBarTop">
                    <img src={logo} className="mainLogo" />
                    <div className="NavBarElement">
                        <Button id="home" onClick={handleNavBar}>HOME</Button>
                        <Button id="about" onClick={handleNavBar}>ABOUT</Button>
                        <Button id="contact" onClick={handleNavBar}>CONTACT</Button>
                        <Button id="loginBtn" onClick={handleNavBar}>LOGIN/REGISTER</Button>
                    </div>
                </div>
                <div className="NavBarSide">
                    <h2>NO. 1 BIKE RENTAL<br /> SERVICES IN BHOPAL</h2>
                    <Button variant="outlined">Learn More<FiArrowRight className="arrowRight" /></Button>
                </div>
            </div>
            <div className="MainContent">
                {showSection()}
            </div>
            <div className="Footer">
                <h3>P NO. 174 SHYAM NAGAR BERKHERA PATHANI, BHOPAL, MADHYA PRADESH</h3>
                <h4>tiwarivikas1407@gmail.com</h4>
                <h3>+91 9826831306/ +91 7992209885</h3>
                <h3>Booking Timings are from 10:00 AM to 8:00 PM</h3>
                <h2>We Are Social</h2>
                <hr />
                <div className="SocialLink">
                    <FaFacebookF />
                </div>
                <div className="rightReserved">
                    ALL RIGHTS RESERVED
                </div>
            </div>
        </div>
    )
}

export default MainPage;