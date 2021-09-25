import React, { useState,useEffect } from 'react'
import logo from "../../images/RentForCentsLogo.png";
import "./UserDashboard.css"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {FiArrowRight} from "react-icons/fi"
import Home from '../WelcomePage/Home/Home';
import About from '../WelcomePage/About/About';
import Contact from '../WelcomePage/Contact/Contact';
import {FaFacebookF, FaTimes} from "react-icons/fa";

const UserDashboard = () => {
    const [id, setId] = useState("home");
    const [isopen, setisopen] = useState(false);

    const showSection = () => {
        switch(id){
            case "home":return    <Home/>
            case "about":return   <About/>
            case "contact":return <Contact/>
        }
    }
    const handleNavBar = (e) => {
        console.log(e.target);
        setId(e.target.name);
    }
    return(
        <div className="UserDashboard">
            <div className="MainPage">
                <div className="NavBarContainer">
                    <div className="NavBarTop">
                        <img src={logo} className="mainLogo" />
                        <div className="NavBarElement">
                            <button id="home" name="home" onClick={handleNavBar}>HOME</button>
                            <button id="about" name="about" onClick={handleNavBar}>ABOUT</button>
                            <button id="contact" name="contact" onClick={handleNavBar}>CONTACT</button>
                            <div className="circle"><h1>{/*localStorage.getItem("name")[0]*/}V</h1></div>
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
        </div>
    )
}


export default UserDashboard;