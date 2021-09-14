import React,{useState} from 'react'
import "./Contact.css"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {FiPhone} from "react-icons/fi"
import {HiOutlineMail} from "react-icons/hi"
import {GoLocation} from "react-icons/go"

const Contact = () => {
    const [value, setValue] = useState({name:"",email:"",phone:"",message:""});
    const handleChange = (e) => {
        if(e.target.name==='phone'){
            if(isNaN(e.target.value)|| e.target.value.length>10){
                return;
            }
        }
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }
    const submitForm = (e) => {
        e.preventDefault();
        if(value.name==="" || value.message==="" || value.email==="" || value.phone===""){
            alert("Please Fill all the Fields");
            return;
        }
        if(value.phone.length!==10){
            alert("Invalid Mobile Number");
            return;
        }
        if(value.email.indexOf('@')===-1 || value.email.indexOf('.com')===-1){
            alert("Invalid Email Address");
            return;
        }
    }
    
    
    return(
        <div className="ContactPage">
            <div className="sideContact">
                <h1>Contact Us</h1>
                <p>Feel Like Contacting Us? Submit your query here and<br /> we will get back to you as soon as possible.</p>
                <div className="detailBox">
                    <FiPhone />
                    <p>+91 9826831306<br />+91 7992209885</p>
                </div>
                <div className="detailBox">
                    <HiOutlineMail />
                    <p>tiwarivikas1407@gmail.com<br />harshitraj4389@gmail.com</p>
                </div>
                <div className="detailBox">
                    <GoLocation/>
                    <p>P NO. 174 SHYAM NAGAR<br />BERKHERA PATHANI,<br />BHOPAL, MADHYA PRADESH</p>
                </div>
            </div>
            <div className="contactForm">
                <h2>Send us a Message</h2>
                <TextField label="Name" name="name" className="materialInput" type="text" value={value.name} onChange={handleChange} /> 
                <TextField label="Email" name="email" className="materialInput" type="text" value={value.email} onChange={handleChange} /> 
                <TextField label="Phone" name="phone" className="materialInput" type="text" value={value.phone} onChange={handleChange} /> 
                <TextField label="Message" name="message" className="materialInput" type="text" value={value.message} onChange={handleChange} multiline={true} /> 
                <Button className="submitBtn" variant="contained" onClick={submitForm}>Submit</Button>
            </div>
        </div>
    )
}

export default Contact;