import React,{useState,useEffect} from "react"
import "./ViewUser.css"

const ViewUser = () => {
    const [value, setValue] = useState([]);

    useEffect(async()=>{
        const res = await fetch("/userData",{
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
    const openModal = (dt) => {
        
    }
    
    return(
        <div className="ViewUser">
            <h2>View Users</h2>
            <div className="ViewUserTable">
                <div className="ViewUserTableHead">
                    <div><b>Id</b></div>
                    <div><b>Name</b></div>
                    <div><b>Email</b></div>
                    <div><b>Phone No.</b></div>
                    <div><b>Gender</b></div>
                    <div><b>Age</b></div>
                    <div><b>City</b></div>
                    <div><b>State</b></div>
                </div>
                {value?.map((dt)=>{
                        return <div className="ViewUserTableBody" onClick={()=>openModal(dt)}>
                                <div>{dt?.ID}</div>
                                <div>{dt?.userDetails?.customerName}</div>
                                <div>{dt?.userDetails?.email}</div>
                                <div>{dt?.userDetails?.contactNumber}</div>
                                <div>{dt?.userDetails?.gender}</div>
                                <div>{dt?.userDetails?.age}</div>
                                <div>{dt?.addressDetails?.city}</div>
                                <div>{dt?.addressDetails?.state}</div>
                        </div>
                })}
            </div>
        </div>
    )
}
export default ViewUser;