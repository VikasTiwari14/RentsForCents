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
import { useHistory } from 'react-router';
import ReactModal from 'react-modal';
import Profile from './Profile/Profile';
import NotFound from "../ManagerDashboard/Profile/Profile"
import History from './History/History';
import Application from './Application/Application';

const UserDashboard = () => {
    const [id, setId] = useState("home");
    const [isopen, setisopen] = useState(false);
    const [section, setSection] = useState("");
    const [islog, setislog] = useState(false);
    const [value, setValue] = useState();
    const history= useHistory();

    const showSection = () => {
        switch(id){
            case "home":return    <Home/>
            case "about":return   <About/>
            case "contact":return <Contact/>
        }
    }
    useEffect(()=>{
        if(localStorage.getItem("name")){
            setislog(false);
            console.log(islog)
        }
        else{
            setislog(true);
            console.log(islog)
        }
    },[])
    useEffect(async() => {
        const res = await fetch(`/user/${localStorage.getItem("id")}`);
        const data = await res.json()
        console.log(data);
        setValue(data.data[0]);
    },[])
    const handleNavBar = (e) => {
        console.log(e.target);
        setId(e.target.name);
    }
    const mouseOver = () => {
        document.getElementsByClassName("dropdown")[0].style.display="flex"
    }
    const mouseOut = () => {
        document.getElementsByClassName("dropdown")[0].style.display="none"
    }
    const signOut = () => {
        localStorage.clear();
        history.push({pathname:"/"});
    }
    const selectSection = (e) => {
        setisopen(true);
        setSection(e.target.id);
    }
    const modalSection = () => {
        switch(section){
            case "profile" : return <Profile />
            case "history" : return <History />
            case "application" : return <Application />
        }
    }
    
    return(
        <>
            <ReactModal isOpen={isopen} portalClassName="userLogIn">
                <FaTimes onClick={() => setisopen(false)} className="closeicon" />
                {modalSection()}
            </ReactModal>
            {console.log(islog)}
            {islog?<NotFound />:
            <div className="UserDashboard">
                <div className="MainPage">
                    <div className="NavBarContainer">
                        <div className="NavBarTop">
                            <img src={logo} className="mainLogo" />
                            <div className="NavBarElement">
                                <button id="home" name="home" onClick={handleNavBar}>HOME</button>
                                <button id="about" name="about" onClick={handleNavBar}>ABOUT</button>
                                <button id="contact" name="contact" onClick={handleNavBar}>CONTACT</button>
                                {value?.documentDetails?.photo?<img src={value?.documentDetails?.photo} className="circle" onMouseOver={mouseOver} onMouseOut={mouseOut} />:<div className="circle" onMouseOver={mouseOver} onMouseOut={mouseOut}><h1>{localStorage.getItem("name")&&localStorage.getItem("name")[0]}</h1></div>}
                            </div>
                            <span></span>
                            <div className="dropdown">
                                <div className="dropdownMenu">
                                    <div>Signed In as<br /> <b>{localStorage.getItem("name")}</b></div>
                                    <hr />
                                    <button id="profile" onClick={selectSection}>Profile</button>
                                    <button id="history" onClick={selectSection}>History</button>
                                    <button id="application" onClick={selectSection}>Applications</button>
                                    <button onClick={signOut}>Log Out</button>
                                </div>
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
            </div>}
        </>
    )
}


export default UserDashboard;