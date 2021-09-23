import React,{useState,useEffect} from "react"
import "./ViewBike.css"

const ViewBike = () => {
    const [value, setValue] = useState([]);

    useEffect(async()=>{
        const res = await fetch("/getBike",{
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
    },[])
    return(
        <div className="ViewBike">
            <h2>View Bike</h2>
            <div className="BikesContainer">
            {
                value?.map((dt)=>{
                    return(
                        <div className="Bikes">
                            <div className="ViewBikeCardLeft">
                                <img src={dt?.vehicleImage} className="bikeImage" />
                                <div className="bikeDetail">
                                    <p>Brand</p>
                                    <p>Model</p>
                                    <h2>{dt?.brandName}</h2>
                                    <p>{dt?.modelNumber}</p>
                                    <p>Vehicle Number</p>
                                    <p>Rate (per day)</p>
                                    <p>{dt?.vehicleNumber}</p>
                                    <p>{dt?.rate}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
                
            </div>
            {/* {
                value?.map((dt)=>{
                    return(
                        <div className="ViewBikeCard">
                            <div className="ViewBikeCardLeft">
                                <h3>ID : {dt?.bikeId}</h3>
                                <h3>Brand Name : {dt?.brandName}</h3>
                                <h3>Vehicle Model : {dt?.modelNumber}</h3>
                                <h3>Vehicle Type : {dt?.vehicleNumber}</h3>
                                <h3>Rate : {dt?.rate}</h3>
                            </div>
                            <div className="ViewBikeCardRight">
                                <img src={dt?.vehicleImage} className="bikeImage" />
                            </div>
                        </div>
                    )
                })
            } */}
        </div>
    )
}
export default ViewBike;