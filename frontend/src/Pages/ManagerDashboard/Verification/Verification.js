import { Button } from "@material-ui/core";
import React,{useState,useEffect} from "react"
import "./Verification.css"
import moment from "moment"

const Verification = () => {
    const [value, setValue] = useState([]);
    const [id, setid ] = useState("");
    const [isopen, setisopen] = useState(false);
    const [isedit, setisedit] = useState([]);
    const [indexes, setIndexes] = useState();

    useEffect(async() => {
        const res = await fetch(`/application/0`);
        const data = await res.json()
        console.log(data);
        let newText = isedit;
        for(let i=0;i<data?.data?.length;i++){
            if(i===indexes)
                newText[i] = true;
            else
                newText[i] = false;
        }
        setisedit(newText)
        setValue(data?.data);
    },[isopen,indexes])
    const handleBook = (index) => {
        let newText = isedit;
        for(let i=0;i<newText.length;i++){
            if(i===index)
                newText[i] = true;
            else
                newText[i] = false;
        }
        setisedit(newText)
        console.log(index,newText)
    }
    const handleConfirm = async(bookingId,index) => {
        console.log(bookingId, id[index])
        if(bookingId===id){
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
                // let newText = id;
                // id[index] = "";
                setid("");
                setIndexes("");
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
                            console.log(isedit[index])
                            return(
                                <div className="ConfirmationTableBody">
                                    <div>{isedit[index]?<input type="text" value={id} onChange={(e) => setid(e.target.value)} className="bookingInput" />:<p></p>} </div>
                                    <div>{dt?.requestedAt}</div>
                                    <div>{dt?.userID}</div>
                                    <div>{dt?.name}</div>
                                    <div>{dt?.vehicleNumber}</div>
                                    <div>{dt?.rate}</div>
                                    <div>{dt?.bookingDuration}</div>
                                    <div>{dt?.price}</div>
                                    {isedit[index]?<Button variant="contained" className="confirmBtn" onClick={() => handleConfirm(dt.bookingId,index)}>Confirm</Button>:<Button variant="contained" className="confirmBtn" onClick={() => setIndexes(index)}>Enter</Button>}
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