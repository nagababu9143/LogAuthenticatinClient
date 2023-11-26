import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { BASE_URL } from '../services/helper';
const PasswordReset = () => {

    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");

    const setValue = (e) => {
        setEmail(e.target.value)
    }

    const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    const sendLink = async (e) => {
        e.preventDefault();

        if (email === "") {
            toast.error("Email is required!",{
                position: "top-center"
            })
        } else if (!emailRegex.test(email)) {
            toast.error("Please provide Valid Email Address!",{
                position: "top-center"
            })
        } else {
            const res = await fetch(`${BASE_URL}/sendpasswordlink`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (data.status == 201) {
                setEmail("");
                setMessage(true)
            } else {
                toast.error("Invalid User",{
                    position: "top-center"
                })
            }
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Enter Your Email</h1>
                    </div>

                    {message ? <p style={{ color: "green", fontWeight: "bold" }}>password reset link send Successfully in Your Email</p> : ""}
                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={email} onChange={setValue} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>

                        <button className='btn' onClick={sendLink}>Send</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default PasswordReset