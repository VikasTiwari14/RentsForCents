import React, { useState, useEffect } from 'react'
import "./Profile.css"
import { Button,TextField, MenuItem, Select } from '@material-ui/core'

const Profile = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [value, setValue] = useState();
    const [docs, setDocs] = useState({
        idType: "",
        idNumber: "",
        idImage:  "Upload Image",
        drivingLicense: "",
        drivingLicenseImage:  "Upload Image",
        photo: "Upload Image"
    });
    const [address, setAddress] = useState()
    const [bank, setBank] = useState({
        number: "",
        name:"",
        ifsc: "",
        bankName : "",
        passbook: "Upload Image"
    });
    const [general, setGeneral] = useState({
        customerName: "",
        email: "",
        mobile: "",
        gender: "",
        dob: "",
        password : "",
        dobImage: "Upload Image"
    });
    const [image, setImage] = useState([]);
    const date = new Date();
    const todayDate=date.getFullYear()+"-"+((date.getMonth()+1)<10?"0"+(date.getMonth()+1):(date.getMonth()+1))+"-"+(date.getDate()<10?"0"+date.getDate():date.getDate());

    useEffect(async() => {
        const res = await fetch(`/user/${localStorage.getItem("id")}`);
        const data = await res.json()
        console.log(data);
        setValue(data.data[0]);
        data.data[0]?.addressDetails&&setAddress(data.data[0]?.addressDetails);
        data.data[0].bankDetails&&setBank(data.data[0].bankDetails);
        data.data[0].bankDetails&&setDocs(data.data[0].documentDetails)
        setGeneral(data.data[0].userDetails)
    },[])
    const handleDocs = (e) => {
        console.log(docs)
        setDocs({...docs, [e.target.name] : e.target.value})
    }
    const handleAddress = (e) => {
        console.log(address)
        setAddress({...address, [e.target.name] : e.target.value})
    }
    const handleBank = (e) => {
        console.log(bank)
        setBank({...bank, [e.target.name] : e.target.value})
    }
    const handleGeneral = (e) => {
        console.log(general)
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
                    switch(parseInt(e.target.name)){
                        case 0: setGeneral({...general,dobImage : dt?.name}); break;
                        case 1: setBank({...bank,passbook : dt?.name}); break;
                        case 2: setDocs({...docs,idImage : dt?.name}); break;
                        case 3: setDocs({...docs,drivingLicenseImage : dt?.name}); break;
                        case 4: setDocs({...docs,photo : dt?.name}); break;
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
    const submitForm = async() => {
        if(!(value?.documentDetails?.drivingLicenseImage)){
            for(let i=0;i<image.length;i++){
                if(!image[i]){
                    alert("Please upload all images");
                    return;
                }
            }
            setGeneral({...general,dobImage : image[0]}); 
            setBank({...bank,passbook : image[1]});
            setDocs({...docs,idImage :image[2]});
            setDocs({...docs,drivingLicenseImage : image[3]});
            setDocs({...docs,photo : image[4]});
        }
        if(address.hNo===""||address.city===""||address.pincode===""||address.state===""||address.country===""||bank.accNo===""||bank.accName===""||bank.bankName===""||bank.ifsc===""||general.gender===""||general.dob===""||docs.idType===""||docs.id===""||docs.license===""){
            alert("Please fill all the required field");
            return;
        }
        
        const body = {
            userDetails: general,
            bankDetails: bank,
            addressDetails: address,
            documentDetails: docs,
            ID: localStorage.getItem("id")
        }
        const res = await fetch("/update",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body:JSON.stringify(body),
        });
        const data = await res.json()
        console.log(data);
        if(data.status){
            alert("Your Account Updated Successfully");
            setImage([]);
            // setValue({ fName:"", lName:"", email:"", mobile:"", gender:"", dob:"", pass:"", cPass:"", hNo:"", street:"", area:"", city:"", state:"", country:"", pincode:"", id:"", idType:"", idImage:"", license:"", licenseImage:"", accNo:"", accName:"", ifsc:"", bankName:"", passBook:"", userImage:"", landmark:"", dobImage:"", photo:""})
        }
        else{
            alert("Some Error Occured Please Try Again");
        }
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
                            <p className="inp">{value?.userDetails?.customerName}</p>
                            <label>Email</label>
                            <p className="inp">{value?.userDetails?.email}</p>
                            <label>Mobile No.</label>
                            <p className="inp">{value?.userDetails?.contactNumber}</p>
                            <label>Gender</label>
                            {value?.userDetails?.gender?<p className="inp">{value?.userDetails?.gender}</p>:
                            <Select variant="outlined" className="materialInput" name="gender" value={general?.gender} onChange={handleGeneral}>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Others">Others</MenuItem>
                            </Select>}
                            <label>Date of Birth</label>
                            {value?.userDetails?.gender?<p className="inp">{value?.userDetails?.DOB}</p>:<>
                            <input className="datePicker" type="date" name="dob" max={todayDate} value={general?.dob} onChange={handleGeneral} />
                            <label>Upload DOB proff</label>
                            <input variant="outlined" className="materialInput fileSelect" type="file" name="0" onChange={handleImage} hidden="hidden" />
                            <TextField variant="outlined" className="materialInput" type="text" name="0" value={general?.dobImage} onClick={handleClick} disabled={true}/>
                            </>}
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
                            <TextField variant="outlined" className="materialInput" type="text" name="pinCode" value={address?.pinCode} onChange={handleAddress} />
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
                            <TextField variant="outlined" className="materialInput" type="text" name="number" value={bank?.number} onChange={handleBank} />
                            <label>Name (as per passbook)</label>
                            <TextField variant="outlined" className="materialInput" type="text" name="name" value={bank?.name} onChange={handleBank} />
                            <label>IFSC Code</label>
                            <TextField variant="outlined" className="materialInput" type="text" name="ifsc" value={bank?.ifsc} onChange={handleBank} />
                            {!(value?.bankDetails?.passbook)&&<>
                                <label>Upload Passbook</label>
                                <input variant="outlined" className="materialInput  fileSelect" type="file" name="1"  onChange={handleImage} hidden="hidden" />
                                <TextField variant="outlined" className="materialInput" type="text" name="1" value={bank?.passbook} onClick={handleClick} disabled={true}/>
                            </>}
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
                            <TextField variant="outlined" className="materialInput" type="text" name="3" value={docs?.drivingLicenseImage} onClick={handleClick} disabled={true}/>
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
                        </div>
                        }
                        <Button variant="contained" className="submitButton" onClick={submitForm} >Update Details</Button>
            </div>
        </div>
    )
}

export default Profile;