import React,{useState,useEffect} from "react"

const Settings = () => {
    const [value, setValue] = useState([]);

    useEffect(async() => {
        const res = await fetch(`/history/0`);
        const data = await res.json()
        console.log(data);
        // setValue(data.data);
    },[])
    return(
        <div className="Settings">
            <h1>BOOKING HISTORY</h1>
            {
                value.length===0?<h2>NO HISTORY AVAILABLE</h2>:
                <div className="HistoryTable">
                    <div className="HistoryTableHead">
                        <div><b>Booking<br />Id</b></div>
                        <div><b>Booked<br />At</b></div>
                        <div><b>Returned<br />At</b></div>
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
                                    <div className="HistoryTableBody">
                                        <div>{dt?.bookingId}</div>
                                        <div>{dt?.bookedAt}</div>
                                        <div>{dt?.returnedAt}</div>
                                        <div>{dt?.customerId}</div>
                                        <div>{dt?.customerName}</div>
                                        <div>{dt?.vehicleNumber}</div>
                                        <div>{dt?.vehicleBrand}</div>
                                        <div>{dt?.rate}</div>
                                        <div>{dt?.duration}</div>
                                        <div>{parseInt(dt?.rate)*parseInt(dt?.duration)}</div>
                                    </div>
                                )
                            })
                        }
                </div>
            }
        </div>
    )
}
export default Settings;