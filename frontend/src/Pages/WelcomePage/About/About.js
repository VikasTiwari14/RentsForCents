import React from 'react'
import "./About.css"
import vikas from "../../../images/vikasTiwari.jpg"
import harshit from "../../../images/harshitRaj.jpeg"


const About = () => {
    return(
        <div className="AboutPage">
            <h1 className="aboutHeading">RENT FOR CENTS</h1>
            <fieldset>
                <legend><b>ABOUT</b></legend>
                <p>Rent for Cents provides Bike renting services all over the BHOPAL, MADHYA PRADESH.
                   We provide well maintained bikes and scooters with the low prices.
                   We are focusing on bringing the best of motorcycling on one platform and make it easily accessible.
                   We have wide variety of Motorbikes in good condition and eassily accessible.
                   Giving one an exhilarating experience of exploring our beautiful country with the thrill and convenience that only a motorcycle can offer.
                </p>
            </fieldset>
            <h2>Who Are We</h2>
            <div className="staffCard1">
                <img src={vikas} className="staffImage" />
                <div className="infoBox">
                    <h2>VIKAS TIWARI</h2>
                    <h3>0103CS203D16</h3>
                    <h3>tiwarivikas1407@gmail.com</h3>
                    <h3>+91 9826831306</h3>
                    <h3>FRONTEND DEVELOPER</h3>
                    <p>Developed the frontend with the help of React.js</p>
                </div>
            </div>
            <div className="staffCard2">
                <div className="infoBox">
                    <h2>HARSHIT RAJ</h2>
                    <h3>0103CS203D04</h3>
                    <h3>harshitraj4839@gmail.com</h3>
                    <h3>+91 7992209885</h3>
                    <h3>BACKEND DEVELOPER</h3>
                    <p>Developed the backend with the help of Express.js and MongoDB</p>
                </div>
                <img src={harshit} className="staffImage" />
            </div>
        </div>
    )
}

export default About;