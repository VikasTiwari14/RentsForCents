import { Button } from "@material-ui/core";
import React,{useState,useEffect} from "react"
import "./Engaged.css"
import moment from "moment"

const Engaged = () => {
    const [value, setValue] = useState([]);
    const [id, setid ] = useState([]);
    const [isopen, setisopen] = useState(false);

    useEffect(async() => {
        const res = await fetch(`/engaged`);
        const data = await res.json()
        console.log(data);
        setValue(data?.data);
    },[isopen])
    const handleConfirm = async(dt) => {
            let body = {
                return: true,
                returnedAt: moment(new Date).format('DD-MM-YYYY HH:mm:ss')
            }
            const res = await fetch(`application/${dt?.bookingId}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(body)
            });
            const data = await res.json();
            if(data.status===200){
                alert("Bike returned successful");
                let body ={
                    available:true
                }
                const result =await fetch(`bike/${dt?.vehicleNumber}`,{
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json",
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(body)
                });
                setisopen(!isopen);
            }
    }
    return (
        <div className="Confirmation">
            <h1>CONFIRMATION</h1>
            {
                value?.length===0?<h2>No Engaged Vehicle</h2>:
                <div className="ConfirmationTable">
                    <div className="ConfirmationTableHead">
                        <div><b>Booking<br />Id</b></div>
                        <div><b>Booked<br />On</b></div>
                        <div><b>Customer<br />Id</b></div>
                        <div><b>Customer<br />Name</b></div>
                        <div><b>Vehicle<br />Number</b></div>
                        <div><b>Rate<br />(per day)</b></div>
                        <div><b>Duration<br />(in days)</b></div>
                        <div><b>Price</b></div>
                        <div></div>
                    </div>
                    {
                        value?.map((dt,index) => {
                            return(
                                <div className="ConfirmationTableBody">
                                    <div>{dt?.bookingId}</div>
                                    <div>{dt?.bookedAt}</div>
                                    <div>{dt?.userID}</div>
                                    <div>{dt?.name}</div>
                                    <div>{dt?.vehicleNumber}</div>
                                    <div>{dt?.rate}</div>
                                    <div>{dt?.duration}</div>
                                    <div>{parseInt(dt?.rate)*parseInt(dt?.duration)}</div>
                                    <Button variant="contained" className="confirmBtn" onClick={() => handleConfirm(dt)}>Bike Returned</Button>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default Engaged
