import { Button } from "@material-ui/core";
import React,{useState,useEffect} from "react"
import "./Verification.css"
import moment from "moment"

const Verification = () => {
    const [value, setValue] = useState([]);
    const [id, setid ] = useState([]);
    const [isopen, setisopen] = useState(false);

    useEffect(async() => {
        const res = await fetch(`/application/0`);
        const data = await res.json()
        console.log(data);
        setValue(data?.data);
        let newText = id;
        data?.data?.forEach((dt,index) => {
            id[index] = "";
        })
    },[isopen])
    const handleBook = (e,index) => {
        let newText = id;
        id[index] = e.target.value;
        setid(newText)
    }
    const handleConfirm = async(bookingId,index) => {
        console.log(bookingId, id[index])
        if(bookingId===id[index]){
            let body = {
                confirm: true,
                bookedAt: moment(new Date).format('DD-MM-YYYY HH:mm:ss')
            }
            const res = await fetch(`application/${bookingId}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(body)
            });
            const data = await res.json();
            if(data.status){
                alert("Bike confirmation successful");
                let newText = id;
                id[index] = "";
                setid(newText)
                setisopen(!isopen);
            }
        }
        else{
            alert("Invalid Booking Id")
        }
    }
    
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
                        <div><b>Rate<br />(per day)</b></div>
                        <div><b>Duration<br />(in days)</b></div>
                        <div><b>Price</b></div>
                        <div></div>
                    </div>
                    {
                        value?.map((dt,index) => {
                            return(
                                <div className="ConfirmationTableBody">
                                    <div><input type="text" value={id[index]} onChange={(e) => handleBook(e,index)} className="bookingInput" /> </div>
                                    <div>{dt?.requestedAt}</div>
                                    <div>{dt?.userID}</div>
                                    <div>{dt?.name}</div>
                                    <div>{dt?.vehicleNumber}</div>
                                    <div>{dt?.rate}</div>
                                    <div>{dt?.bookingDuration}</div>
                                    <div>{dt?.price}</div>
                                    <Button variant="contained" className="confirmBtn" onClick={() => handleConfirm(dt.bookingId,index)}>Confirm</Button>
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