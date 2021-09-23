import React,{useState,useEffect} from "react"

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
            {
                value?.map((dt)=>{
                    return(
                        <div className="ViewBikeCard">
                            <div className="ViewBikeCardLeft">
                                <h3>ID : {dt?.bikeId}</h3>
                                <h3>Brand Name : {dt?.brandName}</h3>
                                <h3>Vehicle Owner : {dt?.brandName}</h3>
                                <h3>Vehicle Type : {dt?.brandName}</h3>
                                <h3>Rate : <h2>{dt?.rate}</h2></h3>
                            </div>
                            <div className="ViewBikeCardRight">
                                <img src={dt?.bikeImage} className="bikeImage" />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default ViewBike;