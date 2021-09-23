import React,{useState,useEffect} from "react"
import "./AddBike.css";
import { TextField, Button, Select, MenuItem } from "@material-ui/core";

const AddBike = () => {
    const [value, setValue] = useState({
        brand:"",
        model:"",
        rate:"",
        number:"",
        type:"",
        image:""
    })
    const [image, setImage] = useState("");

    const handleValue = (e) => {
        setValue({...value, [e.target.name] : e.target.value})
    }
    const handleImage = (e) => {
        if(e.target.files){
            let dt= e.target.files[0];
            if(dt?.size<2000000){
                if(dt.type==="image/png" || dt.type==="image/jpeg" || dt.type==="image/tiff" || dt.type==="image/bmp" || dt.type==="image/svg+xml"){
                    var reader = new FileReader();
                    reader.onload = function(event) {
                        console.log(event.target.result)
                        setImage(event.target.result);
                    };
                    reader.readAsDataURL(dt);
                    setValue({...value,image : dt?.name});
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
        document.getElementsByClassName("fileSelect")[0].click()
    }
    const submitForm = async() => {
        let body = {
            brandName: value.brand,
            modelNumber: value.model,
            vehicleNumber: value.number,
            rate: value.rate,
            type: value.type,
            vehicleImage: image,
        }
        const res = await fetch("/addBike",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body:JSON.stringify(body),
        });
        const data = await res.json()
        if(data.status){
            alert("Bike added successfully");
        }
        else{
            alert("Some Error Occured Please Try Again");
        }
    }

    return(
        <div className="AddBike">
            <h2>ADD BIKE</h2>
            <div className="AddBikeCard">
                <label>Brand Name</label>
                <TextField variant="outlined" className="materialInput" type="text" name="brand" value={value.brand} onChange={handleValue} />
                <label>Model Number</label>
                <TextField variant="outlined" className="materialInput" type="text" name="model" value={value.model} onChange={handleValue} />
                <label>Vehicle Number</label>
                <TextField variant="outlined" className="materialInput" type="text" name="number" value={value.number} onChange={handleValue} />
                <label>Vehicle Type</label>
                <Select variant="outlined" className="materialInput" name="type" value={value.type} onChange={handleValue}>
                    <MenuItem value="Bicycle">Bicycle</MenuItem>
                    <MenuItem value="Bike">Bike</MenuItem>
                    <MenuItem value="Scooter">Scooter</MenuItem>
                </Select>
                <label>Rate (per day)</label>
                <TextField variant="outlined" className="materialInput" type="number" name="rate" value={value.rate} onChange={handleValue} />
                <label>Upload Vehicle Image</label>
                <input variant="outlined" className="materialInput fileSelect" type="file" onChange={handleImage} hidden="hidden" />
                <TextField variant="outlined" className="materialInput" type="text" name="image" value={value.image} onClick={handleClick} disabled={true}/>
            </div>
            <Button variant="contained" className="submitButton" onClick={submitForm}>Save Vehicle</Button>
        </div>
    )
}
export default AddBike;