import React ,{useState}from 'react'
import "./all.css"
import { toast } from 'react-toastify';
import {NavLink} from "react-router-dom" 
import { BASE_URL } from '../services/helper';

const Register = () => {
    const [showPassword,setShowPassword] = useState(false);
    const [showCPassword,setCShowPassword] = useState(false);

    const [inputValue,setInputValue] =useState({
        fname:"",
        email:"",
        phone:"",
        password:"",
        cpassword:""
    })

    //console.log(inputValue);
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

    const addUserData = async(e) => {
        e.preventDefault();

        const { fname, email, phone,password, cpassword } = inputValue;
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
        //phone
        // ^: Start of the string
        // \d: Matches any digit (0-9)
        // {10}: Matches exactly 10 occurrences of the preceding digit
        // $: End of the string
        const phoneRegex = /^\d{10}$/;

        if (fname === "") {
            toast.error("Name is required!",{
                position: "top-center"
            })
        } else if (email === "") {
            toast.error("Email is required!",{
                position: "top-center"
            })
        } else if (!emailRegex.test(email)) {
            toast.error("Please provide Valid Email Address!",{
                position: "top-center"
            })
        }else if (phone === "") {
            toast.error("Phone Number is required!",{
                position: "top-center"
            })
        } else if(!phoneRegex.test(phone)){
            toast.error("Please enter a valid 10-digit phone number.",{
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
        }else if (cpassword === "") {
            toast.error("Confirm password is required!",{
                position: "top-center"
            })
        } else if (cpassword.length < 8) {
            toast.error("Password must be at least 8 characters long",{
                position: "top-center"
            })
        } else if (!passwordRegex.test(cpassword)) {
            toast.error("Confirm Password must contain only numbers and alphabets (no special characters)",{
                position: "top-center"
            })
        } else if (password !== cpassword) {
            toast.error("Password and Confirm password are not matching!",{
                position: "top-center"
            })
        } else {
            // alert("user registration successfully done");

            
            const data = await fetch(`${BASE_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, phone, password, cpassword
                })
            });

            const res = await data.json();
            console.log(res.status);

            if (res.status === 201) {
                toast.success("Registration Successfully done 😃!", {
                    position: "top-center"
                });
                setInputValue({ ...inputValue, fname: "", email: "",phone:"", password: "", cpassword: "" });
            }
        }
    }


    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign Up</h1>
                        <p style={{ textAlign: "center" }}>We are glad that you will be using Project Cloud to manage <br />
                            your tasks! We hope that you will get like it.</p>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="fname">Name</label>
                            <input type="text" onChange={setValue} value={inputValue.fname} name="fname" id="fname" placeholder='Enter Your Name' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" onChange={setValue} value={inputValue.email} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="phone">Phone</label>
                            <input type="text" onChange={setValue} value={inputValue.phone} name="phone" id="phone" placeholder='Enter Your Phone Number' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!showPassword ? "password": "text"} onChange={setValue} name="password" value={inputValue.password} id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setShowPassword(!showPassword)}>
                                    {!showPassword ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Confirm Password</label>
                            <div className="two">
                                <input type={!showCPassword ? "password": "text"} onChange={setValue} value={inputValue.cpassword} name="cpassword" id="cpassword" placeholder='Confirm password' />
                                <div className="showpass" onClick={() => setCShowPassword(!showCPassword)}>
                                    {!showCPassword ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={addUserData}>Sign Up</button>
                        <p>Already have an Account? <NavLink to="/">Login</NavLink></p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Register