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
    const handleValue = (e) => {
        
    }
    return(
        <div className="AddBike">
            <h2>ADD BIKE</h2>
            <div className="AddBikeCard">
                <label>Brand Name</label>
                <TextField variant="outlined" className="materialInput" type="text" name="" value={value.brand} onChange={handleValue} />
                <label>Model Number</label>
                <TextField variant="outlined" className="materialInput" type="text" name="" value={value.model} onChange={handleValue} />
                <label>Vehicle Number</label>
                <TextField variant="outlined" className="materialInput" type="text" name="" value={value.number} onChange={handleValue} />
                <label>Vehicle Type</label>
                <TextField variant="outlined" className="materialInput" type="text" name="" value={value.type} onChange={handleValue} />
                <label>Rate (per day)</label>
                <TextField variant="outlined" className="materialInput" type="text" name="" value={value.rate} onChange={handleValue} />
                <label>Upload Vehicle Image</label>
                <TextField variant="outlined" className="materialInput" type="file" name="" value={value.image} onChange={handleValue} />
            </div>
            <Button variant="contained" className="submitButton">Save Vehicle</Button>
        </div>
    )
}
export default AddBike;