import React,{useState,useEffect} from "react"
import "./Login.css";
import {FaFacebookF,FaTwitter,FaGooglePlusG,FaLock,FaUser} from "react-icons/fa";
import {IoMail} from "react-icons/io5";
import {GrTwitter,GrGoogle} from "react-icons/gr";
import logo from "../../../images/RentForCentsLogo.png";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { RentsForCents } from "../../../Constants/Constants";
import axios from "axios";


const Login = () => {
    const [sign, setSign] = useState({customerName:"",email:"",password:"",contactNumber:""});
    const [isopen, setisopen] = useState(false);
    const [btn, setBtn] = useState();
    const [head, setHead] = useState();
    const [para, setPara] = useState();

    useEffect(()=>{
        setBtn( isopen?"SIGN UP":"SIGN IN")
        setHead(isopen?"Hello, Friend!":"Welcome Back!");
        setPara(isopen?"Enter Your Personal Details And Start Journey With Us.":"To Keep Connected With Us Please Login With Your Credentials");
    },[isopen])
    const handleInput = (e) => {
        setSign({
            ...sign,
            [e.target.name]: e.target.value
        })
    }
    
    const changeSignUp = (e) => {
        setisopen(!isopen);
        let logIn=document.getElementById("log");
        let signUp=document.getElementById("create");
        let animate=document.getElementById("animate");
        
        if(btn=="SIGN IN"){
		    signUp.style.display="none";
			setTimeout(()=>{logIn.style.display="flex"},700);
            animate.style.animation="move 0.7s linear";
		}
	    else{
		    logIn.style.display="none";
			setTimeout(()=>{signUp.style.display="flex"},700);
            animate.style.animation="moveBack 0.7s linear";
		  }
    }
    // const handleSignIn = () => {
    //     axios.post(`/signin`, {
    //             "email": sign.email,
    //             "password": sign.pass
    //         },{
    //             headers: {'Access-Control-Allow-Origin': '*'}
    //         })
    //     .then((response) => {
            
    //     })
    //     .catch((response) => {

    //     })
    // }

    const handleSignIn = async (e)=>{
        e.preventDefault();
        const {email,password} = sign
        const res = await fetch("/signin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body:JSON.stringify({
                email,password
            }),
        });
        const data = await res.json()
    }


    // const handleSignUp = () => {
    //     axios.post(`/signup`, {
    //         "email": sign.email,
    //         "password": sign.pass,
    //         "customerName": sign.name,
    //         "contactNumber": sign.mobile
    //     },{
    //         headers: {'Access-Control-Allow-Origin': '*'}
    //     })
    //     .then((response) => {
    //         alert("Your Account Created Successfully");
    //     })
    //     .catch((response) => {

    //     })
    // }

    const handleSignUp = async (e)=>{
        e.preventDefault();
        const {customerName,contactNumber,email,password} = sign
        const res = await fetch("/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body:JSON.stringify({
                customerName,contactNumber,email,password
            }),
        });
        const data = await res.json()
    }
    
    
    return(
        <>
            <div className="box">
                <div id="animate">
                    <img src={logo} className="mainLogo" />
                    <h1>{head}</h1>
		            <p>{para}</p>
	                <button id="signIn" onClick={changeSignUp}>{btn}</button>
                </div>
                <div id="create">
	                <h1>Create Account</h1>
                    <div className="socialMediaContainer">
		                <FaFacebookF className="socialMedia" />
		                <GrTwitter className="socialMedia" />
		                <GrGoogle className="socialMedia" />
                    </div>
		            <p className="paragraph">or use your email for registeration</p>
		            <div className="inputContainer"><TextField variant="outlined" label="Name" className="materialInput" type="text" name="customerName" placeholder=" Name" value={sign.customerName} onChange={handleInput}  />       </div>
		            <div className="inputContainer"><TextField variant="outlined" label="Email" className="materialInput" type="text" name="email"  placeholder=" Email" value={sign.email} onChange={handleInput} />    </div>
		            <div className="inputContainer"><TextField variant="outlined" label="Password" className="materialInput" type="password" name="password" placeholder=" Password" value={sign.password} onChange={handleInput} /></div>
		            <div className="inputContainer"><TextField variant="outlined" label="Mobile Number" className="materialInput" type="text" name="contactNumber" placeholder=" Mobile Number" value={sign.contactNumber} onChange={handleInput} /></div>
		            <Button variant="contained" onClick={handleSignUp}>SIGN UP</Button>
	            </div>
                <div id="log">
	                <h1>Sign In</h1>
		            <div className="socialMediaContainer">
                        <FaFacebookF className="socialMedia" />
		                <GrTwitter className="socialMedia" />
		                <GrGoogle className="socialMedia" />
                    </div>
		            <p>or use your email account</p>
		            <div className="inputContainer"><TextField variant="outlined" label="Email" className="materialInput" type="text" name="email"  placeholder=" Email" value={sign.email} onChange={handleInput} />    </div>
		            <div className="inputContainer"><TextField variant="outlined" label="Password" className="materialInput" type="password" name="password" placeholder=" Password" value={sign.password} onChange={handleInput} /></div>
		            <label><a href="">Forgot your password?</a></label>
		            <Button variant="contained" onClick={handleSignIn}>SIGN IN</Button>
	            </div>
            </div>
        </>
    )
}


export default Login;