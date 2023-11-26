import React,{useState} from 'react'
//import Avatar from '@mui/material/Avatar';
import {NavLink,useNavigate} from "react-router-dom" 
import { toast } from 'react-toastify';
import { BASE_URL } from '../services/helper';
import "./all.css";

const Login = () => {
    const [showPassword,setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [inputValue,setInputValue] =useState({
        email:"",
        password:""
    })
    
    
    //console.log(inputValue)
    const setValue = (e)=>{
        //console.log(e.target.value);
        const { name, value } = e.target;

        setInputValue(() => {
            return {
                ...inputValue,
                [name]: value
            }
        })
    }

    const loginUser = async(e)=>{
        e.preventDefault();

        // ^: Start of the string
        // [^\s@]+: Match one or more characters that are not whitespace or '@'
        // @: Match the '@' character
        // [^\s@]+: Match one or more characters that are not whitespace or '@'
        // \.: Match the '.' character (Note: It needs to be escaped with a backslash)
        // [^\s@]+: Match one or more characters that are not whitespace or '@'
        // $: End of the string.
        const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        //password
        const passwordRegex = /^[a-zA-Z0-9]+$/;

        const { email, password } = inputValue;
        if (email === "") {
            toast.error("Email is required!",{
                position: "top-center"
            })
        } else if (!emailRegex.test(email)) {
            toast.error("Please provide Valid Email Address!",{
                position: "top-center"
            })
        } else if (password === "") {
            toast.error("Password is required!",{
                position: "top-center"
            })
        } else if (password.length < 8) {
            toast.error("Password must be at least 8 characters long",{
                position: "top-center"
            })
        } else if (!passwordRegex.test(password)) {
            toast.error("Password must contain only numbers and alphabets (no special characters).",{
                position: "top-center"
            })
        }else {
            //alert("User login successfully done");

            const data = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });

            const res = await data.json();
            console.log(res);

            if (res.status === 201) {
                toast.success("Logged In Successfully 😃!", {
                    position: "top-center"
                });
                localStorage.setItem("usersdatatoken",res.result.token);
                navigate("/dash");
                setInputValue({ ...inputValue, email: "",password: "" });
            }
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Welcome Back, Log In</h1>
                        <p>Hi, we are you glad you are back. Please login.</p>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email"  onChange={setValue} value={inputValue.email} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!showPassword ? "password": "text"} onChange={setValue} value={inputValue.password} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setShowPassword(!showPassword)}>
                                    {!showPassword ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={loginUser}>Login</button>
                        <p>Don't have an Account? <NavLink to="/register">Sign Up</NavLink></p>
                        <p style={{color:"black",fontWeight:"bold"}}>Forgot Password  <NavLink to="/password-reset">Click Here</NavLink> </p>
                    </form>
                </div>
            </section>
        </>
    );
}

export default Login;