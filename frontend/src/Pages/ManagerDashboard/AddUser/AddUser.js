import React,{useState,useEffect} from "react";
import "./AddUser.css";
import { TextField, Button, Select, MenuItem } from "@material-ui/core";

const AddUser = () => {
    const [value, setValue] = useState({
        fName:"",
        lName:"",
        email:"",
        mobile:"",
        gender:"",
        dob:"",
        pass:"",
        cPass:"",
        hNo:"",
        street:"",
        area:"",
        city:"",
        state:"",
        country:"",
        pincode:"",
        id:"",
        idType:"",
        idImage:"",
        license:"",
        licenseImage:"",
        accNo:"",
        accName:"",
        ifsc:"",
        bankName:"",
        passBook:"",
        userImage:"",
        landmark:"",
        dobImage:"",
        photo:""
    })  
    const handleValue = (e) => {
        
    }
    
    return(
        <div className="AddUser">
            <h2>ADD USER</h2>
            <div className="AddUserCard">
                <h2>General Information</h2><label></label><label></label><label></label>
                <label>First Name</label>
                <TextField variant="outlined" className="materialInput" type="text" name="" value={value.fName} onChange={handleValue} />
                <label>Last Name</label>
                <TextField variant="outlined" className="materialInput" type="text" name="" value={value.lName} onChange={handleValue} />
                <label>Email</label>
                <TextField variant="outlined" className="materialInput" type="text" name="" value={value.email} onChange={handleValue} />
                <label>Mobile No.</label>
                <TextField variant="outlined" className="materialInput" type="text" name="" value={value.mobile} onChange={handleValue} />
                <label>Gender</label>
                <Select variant="outlined" className="materialInput" name="" value={value.gender} onChange={handleValue}>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                </Select>
                <label>Date of Birth</label>
                <TextField variant="outlined" className="materialInput" type="date" name="" value={value.dob} onChange={handleValue} />
                <label>Upload DOB proff</label>
                <TextField variant="outlined" className="materialInput" type="file" name="" value={value.dobImage} onChange={handleValue} />
                <label>Password</label>
                <TextField variant="outlined" className="materialInput" type="password" name="" value={value.pass} onChange={handleValue} />
                <label>Confirm Password</label>
                <TextField variant="outlined" className="materialInput" type="password" name="" value={value.cPass} onChange={handleValue} />
            </div>
            <div className="AddUserCard">
                <h2>Address Information</h2><label></label><label></label><label></label>
                <label>H.No.</label>
                <TextField variant="outlined" className="materialInput" type="text" name="" value={value.hNo} onChange={handleValue} />
                <label>Street</label>
                <TextField variant="outlined" className="materialInput" type="text" name="" value={value.street} onChange={handleValue} />
                <label>Area</label>
                <TextField variant="outlined" className="materialInput" type="text" name="" value={value.area} onChange={handleValue} />
                <label>Landmark</label>
                <TextField variant="outlined" className="materialInput" type="text" name="" value={value.landmark} onChange={handleValue} />
                <label>Pincode</label>
                <TextField variant="outlined" className="materialInput" type="text" name="" value={value.pincode} onChange={handleValue} />
                <label>City</label>
                <TextField variant="outlined" className="materialInput" type="text" name="" value={value.city} onChange={handleValue} />
                <label>State</label>
                <TextField variant="outlined" className="materialInput" type="text" name="" value={value.state} onChange={handleValue} />
            </div>
            <div className="AddUserCard">
                <h2>Bank Information</h2><label></label><label></label><label></label>
                <label>Bank Name</label>
                <TextField variant="outlined" className="materialInput" type="text" name="" value={value.bankName} onChange={handleValue} />
                <label>Account Number</label>
                <TextField variant="outlined" className="materialInput" type="text" name="" value={value.accNo} onChange={handleValue} />
                <label>Name (as per passbook)</label>
                <TextField variant="outlined" className="materialInput" type="text" name="" value={value.accName} onChange={handleValue} />
                <label>IFSC Code</label>
                <TextField variant="outlined" className="materialInput" type="text" name="" value={value.ifsc} onChange={handleValue} />
                <label>Upload Passbook</label>
                <TextField variant="outlined" className="materialInput" type="file" name="" value={value.passBook} onChange={handleValue} />
            </div>
            <div className="AddUserCard">
                <h2>Document Information</h2><label></label><label></label><label></label>
                <label>ID Type</label>
                <Select variant="outlined" className="materialInput" name="" value={value.idType} onChange={handleValue}>
                    <MenuItem value="Aadhar Card">Aadhar Card</MenuItem>
                    <MenuItem value="PAN Card">PAN Card</MenuItem>
                    <MenuItem value="Passport">Passport</MenuItem>
                </Select>
                <label>ID NO.</label>
                <TextField variant="outlined" className="materialInput" type="text" name="" value={value.id} onChange={handleValue} />
                <label>Upload ID</label>
                <TextField variant="outlined" className="materialInput" type="file" name="" value={value.idImage} onChange={handleValue} />
                <label>Driving License</label>
                <TextField variant="outlined" className="materialInput" type="text" name="" value={value.license} onChange={handleValue} />
                <label>Upload Driving License</label>
                <TextField variant="outlined" className="materialInput" type="file" name="" value={value.licenseImage} onChange={handleValue} />
                <label>Upload User's Photo</label>
                <TextField variant="outlined" className="materialInput" type="file" name="" value={value.photo} onChange={handleValue} />
            </div>
            <Button variant="contained" className="submitButton" >Submit Details</Button>
        </div>
    )
}
export default AddUser;