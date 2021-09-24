import React,{useState,useEffect} from "react"
import { FaTimes} from "react-icons/fa";
import ReactModal from "react-modal"
import {GoVerified,GoUnverified} from "react-icons/go"
import "./ViewUser.css"
import { TextField, Button, Select, MenuItem } from "@material-ui/core";

const ViewUser = () => {
    const [value, setValue] = useState([]);
    const [Ddata, setDdata] = useState();
    const [isopen, setisopen] = useState(false);

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
    },[isopen])
    const openModal = (dt) => {
        setDdata(dt);
        setisopen(true);
    }
    
    return(
        <>
            <ReactModal isOpen={isopen} portalClassName="detailPage">
                <FaTimes className="closeicon" onClick={()=> setisopen(false)} />
                <div className="AddUser">
                    <div className="viewUserHead"><h2>VIEW USER</h2><Button className="verifyButton">Verify User</Button></div>
                    <div className="AddUserCard">
                        <h2>General Information</h2><label></label><label></label><label></label>
                        <label>Name</label>
                        <p className="inp">{Ddata?.userDetails?.customerName}</p>
                        <label>Email</label>
                        <p className="inp">{Ddata?.userDetails?.email}</p>
                        <label>Mobile No.</label>
                        <p className="inp">{Ddata?.userDetails?.contactNumber}</p>
                        <label>Gender</label>
                        <p className="inp">{Ddata?.userDetails?.gender}</p>
                        <label>Date of Birth</label>
                        <p className="inp">{Ddata?.userDetails?.DOB}</p>
                    </div>
                    <div className="AddUserCard">
                        <h2>Address Information</h2><label></label><label></label><label></label>
                        <label>H.No.</label>
                        <p className="inp">{Ddata?.addressDetails?.hNo}</p>
                        <label>Street</label>
                        <p className="inp">{Ddata?.addressDetails?.street}</p>
                        <label>Area</label>
                        <p className="inp">{Ddata?.addressDetails?.area}</p>
                        <label>Landmark</label>
                        <p className="inp">{Ddata?.addressDetails?.landmark}</p>
                        <label>Pincode</label>
                        <p className="inp">{Ddata?.addressDetails?.pinCode}</p>
                        <label>City</label>
                        <p className="inp">{Ddata?.addressDetails?.city}</p>
                        <label>State</label>
                        <p className="inp">{Ddata?.addressDetails?.state}</p>
                        <label>Country</label>
                        <p className="inp">{Ddata?.addressDetails?.country}</p>
                    </div>
                    <div className="AddUserCard">
                        <h2>Bank Information</h2><label></label><label></label><label></label>
                        <label>Bank Name</label>
                        <p className="inp">{Ddata?.bankDetails?.bankName}</p>
                        <label>Account Number</label>
                        <p className="inp">{Ddata?.bankDetails?.number}</p>
                        <label>Name (as per passbook)</label>
                        <p className="inp">{Ddata?.bankDetails?.name}</p>
                        <label>IFSC Code</label>
                        <p className="inp">{Ddata?.bankDetails?.ifsc}</p>
                    </div>
                    <div className="AddUserCard">
                        <h2>Document Information</h2><label></label><label></label><label></label>
                        <label>ID Type</label>
                        <p className="inp">{Ddata?.documentDetails?.idType}</p>
                        <label>ID NO.</label>
                        <p className="inp">{Ddata?.documentDetails?.idNumber}</p>
                        <label>Driving License</label>
                        <p className="inp">{Ddata?.documentDetails?.drivingLicense}</p>
                    </div>
                    <div className="ADDUserCardImage">
                        <h2>Document Information</h2><label></label>
                        <div>
                            <label>User Image</label>
                            <img src={Ddata?.documentDetails?.photo} className="DetailImage" />
                        </div>
                        <div>
                            <label>DOB Proff</label>
                            <img src={Ddata?.userDetails?.dobImage} className="DetailImage" />
                        </div>
                        <div>
                            <label>ID Image</label>
                            <img src={Ddata?.documentDetails?.idImage} className="DetailImage" />
                        </div>
                        <div>
                            <label>Driving License Image</label>
                            <img src={Ddata?.documentDetails?.drivingLicenseImage} className="DetailImage" />
                        </div>
                        <div>
                            <label>Passbook Image</label>
                            <img src={Ddata?.bankDetails?.passbook} className="DetailImage" />
                        </div>
                    </div>
                </div>
            </ReactModal>
            <div className="ViewUser">
                <h2>View Users</h2>
                {/* <img src={value[5].documentDetails.idImage} /> */}
                <div className="ViewUserTable">
                    <div className="ViewUserTableHead">
                        <div><b>Id</b></div>
                        <div><b>Name</b></div>
                        <div><b>Email</b></div>
                        <div><b>Phone No.</b></div>
                        <div><b>Gender</b></div>
                        <div><b>City</b></div>
                        <div><b>State</b></div>
                        <div><b>Verified</b></div>
                    </div>
                    {value?.map((dt)=>{
                            return <div className="ViewUserTableBody" onClick={()=>openModal(dt)}>
                                    <div>{dt?.ID}</div>
                                    <div>{dt?.userDetails?.customerName}</div>
                                    <div>{dt?.userDetails?.email}</div>
                                    <div>{dt?.userDetails?.contactNumber}</div>
                                    <div>{dt?.userDetails?.gender}</div>
                                    <div>{dt?.addressDetails?.city}</div>
                                    <div>{dt?.addressDetails?.state}</div>
                                    <div>{dt?.verified?<GoVerified className="verifiedicon" />:<GoUnverified className="unverifiedicon" />}</div>
                            </div>
                    })}
                </div>
            </div>
        </>
    )
}
export default ViewUser;