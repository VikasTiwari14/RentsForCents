import React, { useState, useEffect } from 'react'
import "./Application.css"

const Application = () => {
    const [value, setValue] = useState([]);

    useEffect(async() => {
        const res = await fetch(`/application/${localStorage.getItem("id")}`);
        const data = await res.json()
        console.log(data);
        setValue(data.data);
    },[])
    return (
        <div className="Application">
            <h1>Bike Booking Applications</h1>
            {
                value?.length===0?<h2>NO ONGOING APPLICATIONS</h2>:
                <div className="ApplicationTable">
                    <div className="ApplicationTableHead">
                        <div><b>Booking<br />Id</b></div>
                        <div><b>Requested<br />On</b></div>
                        <div><b>Customer<br />Id</b></div>
                        <div><b>Customer<br />Name</b></div>
                        <div><b>Vehicle<br />Number</b></div>
                        <div><b>Vehicle<br />Brand</b></div>
                        <div><b>Rate<br />(per day)</b></div>
                        <div><b>Duration<br />(in days)</b></div>
                        <div><b>Price</b></div>
                    </div>
                    {
                    value?.map((dt) => {
                        return(
                            <div className="ApplicationTableBody">
                                <div>{dt?.bookingId}</div>
                                <div>{dt?.requestedAt}</div>
                                <div>{dt?.userID}</div>
                                <div>{dt?.name}</div>
                                <div>{dt?.vehicleNumber}</div>
                                <div>{dt?.brandName}</div>
                                <div>{dt?.rate}</div>
                                <div>{dt?.bookingDuration}</div>
                                <div>{dt?.price}</div>
                            </div>
                        )
                    })
                }
                </div>
            }
        </div>
    )
}

export default Application;