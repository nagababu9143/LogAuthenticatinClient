import React, { useState,useEffect,useContext}  from 'react';
import Header from './components/Header';
import Login from './components/login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PasswordReset from "./components/passwordReset";
import ForgotPassword from "./components/forgotPassword";
import Error from './components/Error';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { LoginContext } from './components/contextprovider/context';
import {Routes,Route,useNavigate}from "react-router-dom"

function App() {
  const [data, setData] = useState(false);

  const { LoginData, setLoginData } = useContext(LoginContext);

  const navigate = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await res.json();

    if (data.status == 401 || !data) {
      console.log("user not valid");
    } else {
      console.log("user verify");
      setLoginData(data)
      navigate ("/dash");
    }
  }

  useEffect(() => {
    setTimeout(()=>{
      DashboardValid();
      setData(true)
    },1000)

  }, [])
  return (
    <>
      {
        data ?
        <>
          <Header/>

          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/dash" element={<Dashboard/>}/>
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/forgotpassword/:id/:token" element={<ForgotPassword />} />
            <Route path="*" element={<Error/>}/>
          </Routes>
        </>
        : 
        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      }

    </>
  );
}

export default App;
