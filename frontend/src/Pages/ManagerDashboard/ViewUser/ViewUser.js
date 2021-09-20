import React,{useState,useEffect} from "react"

const ViewUser = () => {
    const [value, setValue] = useState([]);

    useEffect(()=>{

    })
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
                                <div>{dt?.id}</div>
                                <div>{dt?.customerName}</div>
                                <div>{dt?.email}</div>
                                <div>{dt?.contactNumber}</div>
                                <div>{dt?.gender}</div>
                                <div>{dt?.age}</div>
                                <div>{dt?.city}</div>
                                <div>{dt?.state}</div>
                        </div>
                })}
            </div>
        </div>
    )
}
export default ViewUser;