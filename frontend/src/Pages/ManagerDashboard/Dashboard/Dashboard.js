import React,{useState,useEffect} from "react"
import {FaUsers,FaUserTimes,FaUserCheck,FaMotorcycle,FaHistory} from "react-icons/fa"
import {RiMotorbikeFill} from "react-icons/ri"
import {GiFullMotorcycleHelmet} from "react-icons/gi"
import {FcFeedback} from "react-icons/fc"
import {MdConfirmationNumber} from "react-icons/md"
import "./Dashboard.css"

const Dashboard = () => {
    const [value, setValue] = useState();
    useEffect(() => {
        refreshData();
        setInterval(refreshData,10000)
    },[])
    const refreshData = async() => {
        const res = await fetch("/dashboard",{
            method:"get",
            headers:{
                "Content-Type":"application/json",
                'Access-Control-Allow-Origin': '*'
            },
        });
        const data = await res.json()
        console.log(data.data);
        if(data.status){
            setValue(data.data);
        }
    }
    return(
        <div className="Dashboard">
            <div className="dashboardCard">
                <div>
                    <h2 className="brownText">{value?.countUsers}</h2>
                    <h3>Total Number of Users</h3>
                </div>
                <FaUsers className="dahboardIcon" />
            </div>
            <div className="dashboardCard">
                <div>
                    <h2 className="brownText">{value?.verifiedUsers}</h2>
                    <h3>Number of Users Verified</h3>
                </div>
                <FaUserCheck className="dahboardIcon" />
            </div>
            <div className="dashboardCard">
                <div>
                    <h2 className="brownText">{value?.unVerifiedUsers}</h2>
                    <h3>Number of User Unverified</h3>
                </div>
                <FaUserTimes className="dahboardIcon" />
            </div>
            <div className="dashboardCard">
                <div>
                    <h2 className="brownText">{value?.countBikes}</h2>
                    <h3>Total Number of Bikes</h3>
                </div>
                <FaMotorcycle className="dahboardIcon" />
            </div>
            <div className="dashboardCard">
                <div>
                    <h2 className="brownText">{value?.availBike}</h2>
                    <h3>Number of Bikes Available</h3>
                </div>
                <RiMotorbikeFill className="dahboardIcon" />
            </div>
            <div className="dashboardCard">
                <div>
                    <h2 className="brownText">{value?.unAvailBike}</h2>
                    <h3>Number of Bikes Unavailable</h3>
                </div>
                <GiFullMotorcycleHelmet className="dahboardIcon" />
            </div>
            <div className="dashboardCard">
                <div>
                    <h2 className="brownText">{value?.countBikes}</h2>
                    <h3>Number of Confirmation Request</h3>
                </div>
                <MdConfirmationNumber className="dahboardIcon" />
            </div>
            <div className="dashboardCard">
                <div>
                    <h2 className="brownText">{value?.availBike}</h2>
                    <h3>Total Number of Booking History</h3>
                </div>
                <FaHistory className="dahboardIcon" />
            </div>
            <div className="dashboardCard">
                <div>
                    <h2 className="brownText">{value?.unAvailBike}</h2>
                    <h3>Number of Feedback/Query</h3>
                </div>
                <FcFeedback className="dahboardIcon" />
            </div>
        </div>
    )
}
export default Dashboard;