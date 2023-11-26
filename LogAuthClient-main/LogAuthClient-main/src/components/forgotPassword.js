import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { BASE_URL } from '../services/helper';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const ForgotPassword = () => {

    const { id, token } = useParams();

    const navigate = useNavigate();

    const [data2, setData] = useState(false);

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const userValid = async () => {
        const res = await fetch(`${BASE_URL}/forgotpassword/${id}/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json()

        if (data.status == 201) {
            console.log("user valid")
        } else {
            navigate("*")
        }
    }


    const setVal = (e) => {
        setPassword(e.target.value)
    }

     //password
    const passwordRegex = /^[a-zA-Z0-9]+$/;

    const sendPassword = async (e) => {
        e.preventDefault();

        if (password === "") {
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
        } else {
            const res = await fetch(`${BASE_URL}/${id}/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password })
            });

            const data = await res.json()

            if (data.status == 201) {
                setPassword("")
                setMessage(true)
            } else {
                toast.error("! Token Expired generate new LInk",{
                    position: "top-center"
                })
            }
        }
    }

    useEffect(() => {
        userValid()
        setTimeout(() => {
            setData(true)
        }, 3000)
    }, [])

    return (
        <>
            {
                data2 ? (
                    <>
                        <section>
                            <div className="form_data">
                                <div className="form_heading">
                                    <h1>Enter Your New Password</h1>
                                </div>

                                <form>
                                    {message ? <p style={{ color: "green", fontWeight: "bold" }}>Password Successfully Updated </p> : ""}
                                    <div className="form_input">
                                        <label htmlFor="password">New password</label>
                                        <input type="password" value={password} onChange={setVal} name="password" id="password" placeholder='Enter Your new password' />
                                    </div>

                                    <button className='btn' onClick={sendPassword}>Send</button>
                                </form>
                                <p><NavLink to="/">Home</NavLink></p>
                                <ToastContainer />
                            </div>
                        </section>
                    </>
                ) : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    Loading... &nbsp;
                    <CircularProgress />
                </Box>
            }
        </>
    )
}

export default ForgotPassword