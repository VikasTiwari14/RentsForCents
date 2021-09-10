import React from 'react'
import "./Home.css"
import feature1 from "../../../images/cardPayment.jpg"
import feature2 from "../../../images/maintained.jpg"
import feature3 from "../../../images/best.jpg"
import bike2 from "../../../images/bike2.jpg"
import bike7 from "../../../images/bike7.jpg"
import bike6 from "../../../images/bike6.jpg"
import bike3 from "../../../images/bike3.jpg"
import bike4 from "../../../images/bike4.png"
import bike5 from "../../../images/bike5.png"
import { Button } from '@material-ui/core'


const Home = () => {
    return(
        <>
        <div className="homePage">
            <h1>FEATURES</h1>
            <hr />
            <div className="FeaturesContainer">
                <div className="Features">
                    <img src={feature1} />
                    <h2>CARD PAYMENT</h2>
                    <p>We accept Visa/Master/AMEX Card Payment</p>
                </div>
                <div className="Features">
                    <img src={feature2} />
                    <h2>WELL MAINTAINED MOTOBIKE</h2>
                    <p>We offer Motobikes which are well maintained.</p>
                </div>
                <div className="Features">
                    <img src={feature3} />
                    <h2>BEST PLANS ALL OVER BHOPAL</h2>
                    <p>We offer best customized plan all over in Bhopal</p>
                </div>
            </div>
        </div>
        <div className="homePage">
            <h1>TERMS & CONDITIONS</h1>
            <hr />
            <div className="TermsContainer">
                1. Rider has to submit original PAN Card/Voter Card and a photocopy of Driving License. The same will be returned when he/she returns bike safely.<br />
                2. Rider has to deposite an amout of ₹ 5000 as security. The same will be returned when he/she returns bike safely.<br />
                3. In case of any damage, rider will reimburse Rent For Cents for all expenses to restore the bike to original condition.<br />
                4. In case of Accidents, customer will pay the complete rent till the day the bike become reusable. Security deposit and all the original documents will be returned only after the repairs are completed. Rider will also pay the repair charges of the bike and if it is more than security deposit then rider will pay the excess amount.<br />
                5. All his/her documents will be returned only after he will clear his/her debt to Rent For Cents.<br />
                6. Rider will pay to Rent For Cents all the fines/penalties due to rider's fault.<br />
                7. One helmet per bike will be provided to the rider.<br />
                8. Rider will be responsible for the companion's safety. Rider will follow all traffic rules and won't do rash driving.<br />
                9. Rent For Cents will not be responsible for any illegal activity done by rider.<br />
                10. It is the riders responsibility to operate the rental bike in a manner appropriate to prevailing road and weather conditions; wear a helmet and other protective clothing; know the relevant rules of the road and practice safe riding.<br />
                11. It is the riders responsibility to get the vehicle inspected at us every 30 Days. In case rider fails to inspect the vehicle at us and any engine trouble comes up, he/she has to bear the expence for the same.<br />
            </div>
        </div>
        <div className="homePage">
            <h1>BIKES</h1>
            <hr />
            <div className="BikesContainer">
                <div className="Bikes">
                    <img src={bike2} />
                    <h2>Hero HF Delux</h2>
                    <p>Click the Image for more Info</p>
                </div>
                <div className="Bikes">
                    <img src={bike3} />
                    <h2>Hero Maestro Edge</h2>
                    <p>Click the Image for more Info</p>
                </div>
                <div className="Bikes">
                    <img src={bike4} />
                    <h2>Hero Dream Neo</h2>
                    <p>Click the Image for more Info</p>
                </div>
                <div className="Bikes">
                    <img src={bike5} />
                    <h2>Honda Cliq</h2>
                    <p>Click the Image for more Info</p>
                </div>
                <div className="Bikes">
                    <img src={bike6} />
                    <h2>Honda Grazia</h2>
                    <p>Click the Image for more Info</p>
                </div>
                <div className="Bikes">
                    <img src={bike7} />
                    <h2>Yamaha FZS V2</h2>
                    <p>Click the Image for more Info</p>
                </div>
            </div>
            <Button variant="outlined" className="MoreBtn" >More...</Button>
        </div>
        <div className="homePage">
            <h1>CUSTOMERS REVIEW</h1>
            <hr />
            <div className="CustomersReview">

            </div>
        </div>
        </>
    )
}

export default Home;
