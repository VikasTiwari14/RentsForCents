import React,{useState,useEffect} from "react"

const Feedback = () => {
    const [value, setValue] = useState([])
    return(
        <div className="Feedback">
            <h2>Feedback & Query</h2>
            {
                value?.map((dt) => {
                    return(
                        <div className="FeedbackCard">
                            <div className="FeedbackCardTop">
                                <h3>Name : {dt?.customerName}</h3>
                                <h3>Email : {dt?.email}</h3>
                                <h3>Phone : {dt?.contactNumber}</h3>
                            </div>
                            <div className="FeedbackCardDown">
                                <h4>{dt?.message}</h4>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Feedback;