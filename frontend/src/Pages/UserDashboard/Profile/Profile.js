import React, { useState, useEffect } from 'react'
import "./Profile.css"
import { Button,TextField, MenuItem, Select } from '@material-ui/core'

const Profile = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [value, setValue] = useState();
    const [docs, setDocs] = useState();
    const [address, setAddress] = useState()
    const [bank, setBank] = useState();
    const [general, setGeneral] = useState();
    const [image, setImage] = useState([]);
    const date = new Date();
    const todayDate=date.getFullYear()+"-"+((date.getMonth()+1)<10?"0"+(date.getMonth()+1):(date.getMonth()+1))+"-"+(date.getDate()<10?"0"+date.getDate():date.getDate());

    const handleDocs = (e) => {
        setDocs({...docs, [e.target.name] : e.target.value})
    }
    const handleAddress = (e) => {
        setAddress({...address, [e.target.name] : e.target.value})
    }
    const handleBank = (e) => {
        setBank({...bank, [e.target.name] : e.target.value})
    }
    const handleGeneral = (e) => {
        setGeneral({...general, [e.target.name] : e.target.value})
    }
    const handleClick = (e) => {
        document.getElementsByClassName("fileSelect")[e.target.name].click()
    }
    const handleImage = (e) => {
        if(e.target.files){
            let dt= e.target.files[0];
            if(dt?.size<2000000){
                if(dt.type==="image/png" || dt.type==="image/jpeg" || dt.type==="image/tiff" || dt.type==="image/bmp" || dt.type==="image/svg+xml"){
                    // setValue({...value, [e.target.name] : dt});
                    let newtext = [...image];
                    var reader = new FileReader();
                    reader.onload = function(event) {
                        console.log(event.target.result)
                        newtext[parseInt(e.target.name)] = event.target.result;
                    };
                    reader.readAsDataURL(dt);
                    setImage(newtext);
                    console.log(newtext)
                }
                else{
                    alert("Invalid File Format");
                }
            }
            else{
                alert("File Size Must be Less Than 2MB");
            }
        }
    }
    const submitForm = () => {
        
    }
    
    
    return (
        <div className="UserProfile">
            <div className="UserProfileLeft">
                <div className="UserProfileLeftImage">
                    <img src={value?.documentDetails?.photo} className="ProfilePhoto" />
                </div>
                <div className="UserProfileLeftText">
                    <h2><b>{value?.userDetails?.customerName}</b></h2>
                    <h3>{value?.userDetails?.email}</h3>
                    <h3>{value?.userDetails?.contactNumber}</h3>
                </div>
            </div>
            <div className="UserProfileRight">
                        <div className="AddUserCard">
                            <h2>General Information</h2><label></label><label></label><label></label>
                            <label>Name</label>
                            <TextField variant="outlined" className="materialInput" type="text" name="fName" value={value?.userDetails?.customerName} disabled={true} />
                            <label>Email</label>
                            <TextField variant="outlined" className="materialInput" type="text" name="email" value={value?.userDetails?.email} disabled={true} />
                            <label>Mobile No.</label>
                            <TextField variant="outlined" className="materialInput" type="text" name="mobile" value={value?.userDetails?.mobile} disabled={true} />
                            <label>Gender</label>
                            <Select variant="outlined" className="materialInput" name="gender" value={general?.gender} onChange={handleGeneral}>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Others">Others</MenuItem>
                            </Select>
                            <label>Date of Birth</label>
                            <input className="materialInput" type="date" name="dob" max={todayDate} value={general?.dob} onChange={handleGeneral} />
                        </div>
                        <div className="AddUserCard">
                            <h2>Address Information</h2><label></label><label></label><label></label>
                            <label>H.No.</label>
                            <TextField variant="outlined" className="materialInput" type="text" name="hNo" value={address?.hNo} onChange={handleAddress} />
                            <label>Street</label>
                            <TextField variant="outlined" className="materialInput" type="text" name="street" value={address?.street} onChange={handleAddress} />
                            <label>Area</label>
                            <TextField variant="outlined" className="materialInput" type="text" name="area" value={address?.area} onChange={handleAddress} />
                            <label>Landmark</label>
                            <TextField variant="outlined" className="materialInput" type="text" name="landmark" value={address?.landmark} onChange={handleAddress} />
                            <label>Pincode</label>
                            <TextField variant="outlined" className="materialInput" type="text" name="pincode" value={address?.pincode} onChange={handleAddress} />
                            <label>City</label>
                            <TextField variant="outlined" className="materialInput" type="text" name="city" value={address?.city} onChange={handleAddress} />
                            <label>State</label>
                            <TextField variant="outlined" className="materialInput" type="text" name="state" value={address?.state} onChange={handleAddress} />
                            <label>Country</label>
                            <TextField variant="outlined" className="materialInput" type="text" name="country" value={address?.country} onChange={handleAddress} />
                        </div>
                        <div className="AddUserCard">
                            <h2>Bank Information</h2><label></label><label></label><label></label>
                            <label>Bank Name</label>
                            <TextField variant="outlined" className="materialInput" type="text" name="bankName" value={bank?.bankName} onChange={handleBank} />
                            <label>Account Number</label>
                            <TextField variant="outlined" className="materialInput" type="text" name="accNo" value={bank?.accNo} onChange={handleBank} />
                            <label>Name (as per passbook)</label>
                            <TextField variant="outlined" className="materialInput" type="text" name="accName" value={bank?.accName} onChange={handleBank} />
                            <label>IFSC Code</label>
                            <TextField variant="outlined" className="materialInput" type="text" name="ifsc" value={bank?.ifsc} onChange={handleBank} />
                        </div>
                        {!(value?.documentDetails)?
                        <div className="AddUserCard">
                            <h2>Document Information</h2><label></label><label></label><label></label>
                            <label>ID Type</label>
                            <Select variant="outlined" className="materialInput" name="idType" value={docs?.idType} onChange={handleDocs}>
                                <MenuItem value="Aadhar Card">Aadhar Card</MenuItem>
                                <MenuItem value="PAN Card">PAN Card</MenuItem>
                                <MenuItem value="Passport">Passport</MenuItem>
                            </Select>
                            <label>ID NO.</label>
                            <TextField variant="outlined" className="materialInput" type="text" name="id" value={docs?.id} onChange={handleDocs} />
                            <label>Upload ID</label>
                            <input variant="outlined" className="materialInput  fileSelect" type="file" name="2" onChange={handleImage} hidden="hidden" />
                            <TextField variant="outlined" className="materialInput" type="text" name="2" value={docs?.idImage} onClick={handleClick} disabled={true}/>
                            <label>Driving License</label>
                            <TextField variant="outlined" className="materialInput" type="text" name="license" value={docs?.license} onChange={handleDocs} />
                            <label>Upload Driving License</label>
                            <input variant="outlined" className="materialInput  fileSelect" type="file" name="3" onChange={handleImage} hidden="hidden" />
                            <TextField variant="outlined" className="materialInput" type="text" name="3" value={docs?.licenseImage} onClick={handleClick} disabled={true}/>
                            <label>Upload User's Photo</label>
                            <input variant="outlined" className="materialInput  fileSelect" type="file" name="4" onChange={handleImage} hidden="hidden" />
                            <TextField variant="outlined" className="materialInput" type="text" name="4" value={docs?.photo} onClick={handleClick} disabled={true}/>
                        </div>
                        :
                        <div className="AddUserCard">
                            <h2>Document Information</h2><label></label><label></label><label></label>
                            <label>ID NO.</label>
                            <p className="inp">{value?.documentDetails?.idNumber}</p>
                            <label>Driving License</label>
                            <p className="inp">{value?.documentDetails?.drivingLicense}</p>
                            <label>ID Image</label>
                            <img src={value?.documentDetails?.idImage} className="DetailImage" />
                            <label>Driving License Image</label>
                            <img src={value?.documentDetails?.idImage} className="DetailImage" />
                        </div>
                        }
                        <Button variant="contained" className="submitButton" onClick={submitForm} >Update Details</Button>
            </div>
        </div>
    )
}

export default Profile;