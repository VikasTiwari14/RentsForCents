import React,{useState,useEffect} from "react"
import "./Feedback.css"

const Feedback = () => {
    const [value, setValue] = useState([]);
    useEffect(async()=>{
        const res = await fetch("/userFeedback",{
            method:"get",
            headers:{
                "Content-Type":"application/json",
                'Access-Control-Allow-Origin': '*'
            },
        });
        const data = await res.json()
        console.log(data);
        if(data.status){
            setValue(data.data);
        }
    },[])
    return(
        <div className="Feedback">
            <h2>Feedback & Query</h2>
            {
                value?.map((dt) => {
                    return(
                        <div className="FeedbackCard">
                            <div className="FeedbackCardTop">
                                <h3>Name : <span className="brownText">{dt?.name}</span></h3>
                                <h3>Email : <span className="brownText">{dt?.email}</span></h3>
                                <h3>Phone : <span className="brownText">{dt?.phone}</span></h3>
                            </div>
                            <div className="FeedbackCardDown">
                                <h4>Message : <span className="brownText">{dt?.message}</span></h4>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Feedback;