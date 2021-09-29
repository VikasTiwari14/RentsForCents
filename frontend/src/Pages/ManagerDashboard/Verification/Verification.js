import { Button } from "@material-ui/core";
import React,{useState,useEffect} from "react"
import "./Verification.css"

const Verification = () => {
    const [value, setValue] = useState([]);
    const [id, setid ] = useState();

    useEffect(async() => {
        const res = await fetch(`/application/0`);
        const data = await res.json()
        console.log(data);
        setValue(data?.data);
    },[])
    return(
        <div className="Confirmation">
             <h1>CONFIRMATION</h1>
            {
                value?.length===0?<h2>No Request for Confirmation</h2>:
                <div className="ConfirmationTable">
                    <div className="ConfirmationTableHead">
                        <div><b>Booking<br />Id</b></div>
                        <div><b>Requested<br />On</b></div>
                        <div><b>Customer<br />Id</b></div>
                        <div><b>Customer<br />Name</b></div>
                        <div><b>Vehicle<br />Number</b></div>
                        <div><b>Vehicle<br />Brand</b></div>
                        <div><b>Rate<br />(per day)</b></div>
                        <div><b>Duration<br />(in days)</b></div>
                        <div><b>Price</b></div>
                        <div></div>
                    </div>
                    {
                        value?.map((dt) => {
                            return(
                                <div className="ConfirmationTableBody">
                                    <div><input type="text" value={id} onChange={(e) => setid(e.target.value)} className="bookingInput" /> </div>
                                    <div>{dt?.requestedOn}</div>
                                    <div>{dt?.customerId}</div>
                                    <div>{dt?.customerName}</div>
                                    <div>{dt?.vehicleNumber}</div>
                                    <div>{dt?.vehicleBrand}</div>
                                    <div>{dt?.rate}</div>
                                    <div>{dt?.duration}</div>
                                    <div>{parseInt(dt?.rate)*parseInt(dt?.duration)}</div>
                                    <Button variant="contained" className="confirmBtn">Confirm</Button>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}
export default Verification;