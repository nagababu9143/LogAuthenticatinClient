import React, { useState,useEffect,useContext} from 'react'
import { BASE_URL } from '../services/helper';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './contextprovider/context';
import CircularProgress from '@mui/material/CircularProgress';

import Box from '@mui/material/Box';
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/jamisaiteja/hihkjljl.git
// git push -u origin main
const Dashboard = () => {
    const [data, setData] = useState(false);
    const {LoginData,setLoginData} = useContext(LoginContext);
    //console.log(LoginData.ValidUserOne.fname)
    const fname = LoginData?.ValidUserOne?.fname ?? '';
    const navigate = useNavigate();

    const dashboardValid = async () => {
        let token = localStorage.getItem('usersdatatoken');
        //console.log(token);

        const res = await fetch(`${BASE_URL}/validuser`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await res.json();
        //console.log(data);
        if (data.status === 401 || !data) {
            navigate("*");
            //console.log("error");
        } else {
            console.log("user verified");
            setLoginData(data)
            navigate("/dash");
        }
    }

    useEffect(() => {
        setTimeout(() => {
            dashboardValid();
            setData(true)
        }, 2000)

    }, [])

    return (
        <>
            {data ?
                <>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration:"none"}}>
                    <img src="./man.png" style={{ width: "200px", marginTop: 20 }} alt="" />
                    <h1>Welcome, {fname ? fname.toUpperCase() : ''}</h1>
                </div></>
                :
                <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    Loading... &nbsp;
                    <CircularProgress />
                </Box>
            }
        </>
    )
}

export default Dashboard