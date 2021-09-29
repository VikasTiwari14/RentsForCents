import React,{useState,useEffect} from "react"
import "./Login.css";
import {FaFacebookF,FaTwitter,FaGooglePlusG,FaLock,FaUser} from "react-icons/fa";
import {IoMail} from "react-icons/io5";
import {GrTwitter,GrGoogle} from "react-icons/gr";
import logo from "../../../images/RentForCentsLogo.png";
import login2 from "../../../images/login3.jpg";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { RentsForCents } from "../../../Constants/Constants";
import axios from "axios";
import login from "../../../images/login.jpg"
import { useHistory } from "react-router";


const Login = ({isLog}) => {
    const [sign, setSign] = useState({fName:"",email:"",password:"",mobile:""});
    const [isopen, setisopen] = useState(false);
    const [btn, setBtn] = useState();
    const [head, setHead] = useState();
    const [para, setPara] = useState();
    const history= useHistory();
    useEffect(()=>{
        setBtn( isopen?"SIGN UP":"SIGN IN")
        setHead(isopen?"Hello, Friend!":"Welcome Back!");
        setPara(isopen?"Enter Your Personal Details And Start Journey With Us.":"To Keep Connected With Us Please Login With Your Credentials");
    },[isopen])
    const handleInput = (e) => {
        if(e.target.name==='mobile'){
            if(isNaN(e.target.value)|| e.target.value.length>10){
                return;
            }
        }
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
        let body = {
            email: sign.email,
            password: sign.password
        }
        const res = await fetch("/signin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body:JSON.stringify(body),
        });
        const data = await res.json()
        if(data.status){
            localStorage.setItem("name",data.data.userDetails.customerName)
            localStorage.setItem("email",data.data.userDetails.email)
            localStorage.setItem("mobile",data.data.userDetails.contactNumber)
            localStorage.setItem("verified",data.data.verified)
            localStorage.setItem("id",data.data.ID)
            history.push({pathname:"/user-dashboard"})
        }
        else{
            alert(data.message);
        }
    }
    const handleManagerSignIn = async (e)=>{
        e.preventDefault();
        if(sign.email==="" || sign.password===""){
            alert("All Fields Are Mandatory");
            return;
        }
        const {email,password} = sign
        const res = await fetch("/managerLogin",{
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
        if(data.status){
            localStorage.setItem("name",data.data.name)
            localStorage.setItem("email",data.data.email)
            localStorage.setItem("mobile",data.data.mobile)
            history.push({pathname:"/manager-dashboard"})
        }
        else{
            alert(data.message);
        }
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
        if(sign.mobile==="" || sign.fName==="" || sign.email==="" || sign.password===""){
            alert("All Fields Are Mandatory");
            return;
        }
        if(sign.mobile.length!==10){
            alert("Invalid Mobile Number");
            return;
        }
        if(sign.email.indexOf('@')===-1 || sign.email.indexOf('.com')===-1){
            alert("Invalid Email Address");
            return;
        }
        const {fName,mobile,email,password} = sign
        const userDetails =
        {
                fName: fName,
                email: email,
                mobile: mobile,
                password:password
        }
        const res = await fetch("/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body:JSON.stringify({
                userDetails
            }),
        });
        const data = await res.json()
        console.log(data);
        if(data.status){
            alert("Your Account Created Successfully");
            setSign({fName:"",email:"",password:"",mobile:""});
        }
        else if(data.message==="user already registered"){
            alert(data.message);
        }
        else{
            alert("Some Error Occured Please Try Again");
        }
    }
    
    
    return(
        <>
            {isLog?
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
		            <div className="inputContainer"><TextField variant="outlined" label="Name" className="materialInput" type="text" name="fName" placeholder=" Name" value={sign.fName} onChange={handleInput}  />       </div>
		            <div className="inputContainer"><TextField variant="outlined" label="Email" className="materialInput" type="text" name="email"  placeholder=" Email" value={sign.email} onChange={handleInput} />    </div>
		            <div className="inputContainer"><TextField variant="outlined" label="Password" className="materialInput" type="password" name="password" placeholder=" Password" value={sign.password} onChange={handleInput} /></div>
		            <div className="inputContainer"><TextField variant="outlined" label="Mobile Number" className="materialInput" type="text" name="mobile" placeholder=" Mobile Number" value={sign.mobile} onChange={handleInput} /></div>
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
            :
            <div className="Loginbox">
                <div id="sideBox">
                    <img src={logo} className="mainLogo" />
                    <h1>Manager Login</h1>
                </div>
                <div id="login">
	                <h1>Sign In</h1>
		            <div className="inputContainer"><TextField variant="outlined" label="Email" className="materialInput" type="text" name="email"  placeholder=" Email" value={sign.email} onChange={handleInput} />    </div>
		            <div className="inputContainer"><TextField variant="outlined" label="Password" className="materialInput" type="password" name="password" placeholder=" Password" value={sign.password} onChange={handleInput} /></div>
		            <label><a href="">Forgot your password?</a></label>
		            <Button variant="contained" onClick={handleManagerSignIn}>SIGN IN</Button>
	            </div>
            </div>
            }
        </>
    )
}


export default Login;