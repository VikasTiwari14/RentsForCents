import React, { useState,useEffect } from 'react'
import "./ManagerDashboard.css"
import Dashboard from "./Dashboard/Dashboard"
import AddBike from './AddBike/AddBike';
import AddUser from './AddUser/AddUser';
import Feedback from './Feedback/Feedback';
import Profile from './Profile/Profile';
import Settings from './Settings/Settings';
import Verification from './Verification/Verification';
import ViewBike from './ViewBike/ViewBike';
import ViewUser from './ViewUser/ViewUser';
import { FaBell } from "react-icons/fa";
import { useHistory } from 'react-router';

const ManagerDashboard = () => {
    const [value, setValue] = useState("b1");
    const [islog, setislog] = useState(false);
    const history= useHistory();
    useEffect(() => {
        if(localStorage.getItem("email")){
            setislog(false);
        }
        else{
            setislog(true);
        }
    },[])
    const handleValue = (e) => {
        setValue(e.target.id);
        for(let i=1;i<=8;i++){
            console.log(i, e.target.id[1])
            if(i===parseInt(e.target.id[1])){
                document.getElementById(e.target.id).style.background="#1e1e1e"
                document.getElementById(e.target.id).style.color="#cd5500"
            }
            else{
                document.getElementById("b"+i).style.background="black"
                document.getElementById("b"+i).style.color="white"
            }
        }
    }
    const selectComponent = () => {
        switch(value){
            case "b1" : return <Dashboard />
            case "b2" : return <AddUser />
            case "b4" : return <AddBike />
            case "b3" : return <ViewUser />
            case "b5" : return <ViewBike />
            case "b6" : return <Feedback />
            case "b7" : return <Verification />
            case "b8" : return <Settings />
        }
    }
    const signOut = () => {
        localStorage.clear();
        history.push({pathname:"/"});
    }
    
    return(
        <>
            {islog?<Profile />:
            <div className="ManagerDashboard">
                <div className="sideContent">
                    <div>
                        <h1>RENT FOR CENTS</h1>
                    </div>
                    <div  className="dash">
                        <input type="button" id="b1" value="Dashboard" onClick={handleValue}/>
                        <input type="button" id="b2" value="Add Users" onClick={handleValue}/>
                        <input type="button" id="b3" value="View Users" onClick={handleValue}/>
                        <input type="button" id="b4" value="Add Bike" onClick={handleValue}/>
                        <input type="button" id="b5" value="View Bikes" onClick={handleValue}/>
                        <input type="button" id="b7" value="Confirmation" onClick={handleValue}/>
                        <input type="button" id="b8" value="Booking History" onClick={handleValue}/>
                        <input type="button" id="b6" value="Feedback & Query" onClick={handleValue}/>
                        <input type="button" id="b0" value="Sign Out" onClick={signOut}/>
                    </div>
                </div>
                <div  className="topContent">
                    <div>
                        <span>Welcome</span><br />
                        <span>{localStorage.getItem("name")}</span>
                    </div>
                        <div className="circle"></div>
                </div>
                <div className="mainContent">
                    {selectComponent()}
                </div>
            </div>
            }
        </>
    )
}


export default ManagerDashboard;