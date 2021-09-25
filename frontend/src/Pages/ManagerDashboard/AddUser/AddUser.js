import React,{useState,useEffect} from "react";
import "./AddUser.css";
import { TextField, Button, Select, MenuItem } from "@material-ui/core";
import {HiUpload} from "react-icons/hi"

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
        idImage:"UPLOAD IMAGE",
        license:"",
        licenseImage:"UPLOAD IMAGE",
        accNo:"",
        accName:"",
        ifsc:"",
        bankName:"",
        passBook:"UPLOAD IMAGE",
        userImage:"",
        landmark:"",
        dobImage:"UPLOAD IMAGE",
        photo:"UPLOAD IMAGE"
    }) 
    const [image, setImage] = useState([]); 
    const [images, setImages] = useState([]);
    const date=new Date();
    const todayDate=date.getFullYear()+"-"+((date.getMonth()+1)<10?"0"+(date.getMonth()+1):(date.getMonth()+1))+"-"+(date.getDate()<10?"0"+date.getDate():date.getDate());
    const handleValue = (e) => {
        if(e.target.name==="mobile"){
            if(isNaN(e.target.value)|| e.target.value.length>10){
                return;
            }
        }
        if(e.target.name==="pincode"){
            if(isNaN(e.target.value)|| e.target.value.length>6){
                return;
            }
        }
        if(e.target.value==="accNo"){
            if(isNaN(e.target.value)){
                return;
            }
        }
        setValue({...value, [e.target.name] : e.target.value})
    }
    const handleImage = (e) => {
        console.log( URL.createObjectURL(e.target.files[0]));
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
                    switch(parseInt(e.target.name)){
                        case 0: setValue({...value,dobImage : dt?.name}); break;
                        case 1: setValue({...value,passBook : dt?.name}); break;
                        case 2: setValue({...value,idImage : dt?.name}); break;
                        case 3: setValue({...value,licenseImage : dt?.name}); break;
                        case 4: setValue({...value,photo : dt?.name}); break;
                    }
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
    const handleClick = (e) => {
        document.getElementsByClassName("fileSelect")[e.target.name].click()
    }
    const saveImage = (file) => {
        var reader = new FileReader();
        reader.onload = function(event) {
            console.log(event.target.result)
            setImages(prevState => [...prevState, event.target.result])
        };
        reader.readAsDataURL(file);
    }
    
    const submitForm = async() => {
        for(let i=0;i<image.length;i++){
            if(!image[i]){
                alert("Please upload all images");
                return;
            }
        }
        if(value.hNo===""||value.city===""||value.pincode===""||value.state===""||value.country===""||value.accNo===""||value.accName===""||value.bankName===""||value.ifsc===""||value.fName===""||value.lName===""||value.mobile===""||value.gender===""||value.email===""||value.dob===""||value.pass===""||value.cPass===""||value.idType===""||value.id===""||value.license===""){
            alert("Please fill all the required field");
            return;
        }
        if(value.pass!==value.cPass){
            alert("Password not matching");
            return;
        }
        console.log(image)
        let body = {
            addressDetails:{
                hNo:value.hNo,
                street:value.street,
                area : value.area,
                city: value.city,
                landmark:value.landmark,
                pinCode : value.pincode,
                state: value.state,
                country: value.country
            },
            bankDetails:{
                    number: value.accNo,
                    name:value.accName,
                    ifsc: value.ifsc,
                    bankName : value.bankName,
                    passbook: image[1]
            },
            userDetails:{
                fullName: value.fName+" "+value.lName,
                email: value.email,
                mobile: value.mobile,
                gender: value.gender,
                dob: value.dob,
                password : value.pass,
                dobImage: image[0]
            },
            documentDetails:{
                idType: value.idType,
                idNumber: value.id,
                idImage:  image[2],
                drivingLicense: value.license,
                drivingLicenseImage:  image[3],
                photo: image[4]
            },
        }
        const res = await fetch("/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body:JSON.stringify(body),
        });
        const data = await res.json()
        console.log(data);
        if(data.status){
            alert("Your Account Created Successfully");
            setImage([]);
            setValue({ fName:"", lName:"", email:"", mobile:"", gender:"", dob:"", pass:"", cPass:"", hNo:"", street:"", area:"", city:"", state:"", country:"", pincode:"", id:"", idType:"", idImage:"", license:"", licenseImage:"", accNo:"", accName:"", ifsc:"", bankName:"", passBook:"", userImage:"", landmark:"", dobImage:"", photo:""})
        }
        else if(data.message==="user already registered"){
            alert(data.message);
        }
        else{
            alert("Some Error Occured Please Try Again");
        }
    }
    
    
    return(
        <div className="AddUser">
            <h2>ADD USER</h2>
            <div className="AddUserCard">
                <h2>General Information</h2><label></label><label></label><label></label>
                <label>First Name</label>
                <TextField variant="outlined" className="materialInput" type="text" name="fName" value={value.fName} onChange={handleValue} />
                <label>Last Name</label>
                <TextField variant="outlined" className="materialInput" type="text" name="lName" value={value.lName} onChange={handleValue} />
                <label>Email</label>
                <TextField variant="outlined" className="materialInput" type="text" name="email" value={value.email} onChange={handleValue} />
                <label>Mobile No.</label>
                <TextField variant="outlined" className="materialInput" type="text" name="mobile" value={value.mobile} onChange={handleValue} />
                <label>Gender</label>
                <Select variant="outlined" className="materialInput" name="gender" value={value.gender} onChange={handleValue}>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                </Select>
                <label>Date of Birth</label>
                <input className="materialInput" type="date" name="dob" max={todayDate} value={value.dob} onChange={handleValue} />
                <label>Upload DOB proff</label>
                <input variant="outlined" className="materialInput fileSelect" type="file" name="0" onChange={handleImage} hidden="hidden" />
                <TextField variant="outlined" className="materialInput" type="text" name="0" value={value.dobImage} onClick={handleClick} disabled={true}/>
                <label>Password</label>
                <TextField variant="outlined" className="materialInput" type="password" name="pass" value={value.pass} onChange={handleValue} />
                <label>Confirm Password</label>
                <TextField variant="outlined" className="materialInput" type="password" name="cPass" value={value.cPass} onChange={handleValue} />
            </div>
            <div className="AddUserCard">
                <h2>Address Information</h2><label></label><label></label><label></label>
                <label>H.No.</label>
                <TextField variant="outlined" className="materialInput" type="text" name="hNo" value={value.hNo} onChange={handleValue} />
                <label>Street</label>
                <TextField variant="outlined" className="materialInput" type="text" name="street" value={value.street} onChange={handleValue} />
                <label>Area</label>
                <TextField variant="outlined" className="materialInput" type="text" name="area" value={value.area} onChange={handleValue} />
                <label>Landmark</label>
                <TextField variant="outlined" className="materialInput" type="text" name="landmark" value={value.landmark} onChange={handleValue} />
                <label>Pincode</label>
                <TextField variant="outlined" className="materialInput" type="text" name="pincode" value={value.pincode} onChange={handleValue} />
                <label>City</label>
                <TextField variant="outlined" className="materialInput" type="text" name="city" value={value.city} onChange={handleValue} />
                <label>State</label>
                <TextField variant="outlined" className="materialInput" type="text" name="state" value={value.state} onChange={handleValue} />
                <label>Country</label>
                <TextField variant="outlined" className="materialInput" type="text" name="country" value={value.country} onChange={handleValue} />
            </div>
            <div className="AddUserCard">
                <h2>Bank Information</h2><label></label><label></label><label></label>
                <label>Bank Name</label>
                <TextField variant="outlined" className="materialInput" type="text" name="bankName" value={value.bankName} onChange={handleValue} />
                <label>Account Number</label>
                <TextField variant="outlined" className="materialInput" type="text" name="accNo" value={value.accNo} onChange={handleValue} />
                <label>Name (as per passbook)</label>
                <TextField variant="outlined" className="materialInput" type="text" name="accName" value={value.accName} onChange={handleValue} />
                <label>IFSC Code</label>
                <TextField variant="outlined" className="materialInput" type="text" name="ifsc" value={value.ifsc} onChange={handleValue} />
                <label>Upload Passbook</label>
                <input variant="outlined" className="materialInput  fileSelect" type="file" name="1"  onChange={handleImage} hidden="hidden" />
                <TextField variant="outlined" className="materialInput" type="text" name="1" value={value.passBook} onClick={handleClick} disabled={true}/>
            </div>
            <div className="AddUserCard">
                <h2>Document Information</h2><label></label><label></label><label></label>
                <label>ID Type</label>
                <Select variant="outlined" className="materialInput" name="idType" value={value.idType} onChange={handleValue}>
                    <MenuItem value="Aadhar Card">Aadhar Card</MenuItem>
                    <MenuItem value="PAN Card">PAN Card</MenuItem>
                    <MenuItem value="Passport">Passport</MenuItem>
                </Select>
                <label>ID NO.</label>
                <TextField variant="outlined" className="materialInput" type="text" name="id" value={value.id} onChange={handleValue} />
                <label>Upload ID</label>
                <input variant="outlined" className="materialInput  fileSelect" type="file" name="2" onChange={handleImage} hidden="hidden" />
                <TextField variant="outlined" className="materialInput" type="text" name="2" value={value.idImage} onClick={handleClick} disabled={true}/>
                <label>Driving License</label>
                <TextField variant="outlined" className="materialInput" type="text" name="license" value={value.license} onChange={handleValue} />
                <label>Upload Driving License</label>
                <input variant="outlined" className="materialInput  fileSelect" type="file" name="3" onChange={handleImage} hidden="hidden" />
                <TextField variant="outlined" className="materialInput" type="text" name="3" value={value.licenseImage} onClick={handleClick} disabled={true}/>
                <label>Upload User's Photo</label>
                <input variant="outlined" className="materialInput  fileSelect" type="file" name="4" onChange={handleImage} hidden="hidden" />
                <TextField variant="outlined" className="materialInput" type="text" name="4" value={value.photo} onClick={handleClick} disabled={true}/>
            </div>
            <Button variant="contained" className="submitButton" onClick={submitForm} >Submit Details</Button>
        </div>
    )
}
export default AddUser;