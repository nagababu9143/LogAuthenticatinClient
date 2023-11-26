import React, {useContext} from 'react'
import { BASE_URL } from '../services/helper';
import Avatar from '@mui/material/Avatar'; 
import { LoginContext } from './contextprovider/context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate,NavLink  } from 'react-router-dom';
import "./Header.css";

const Header = () => {
    const {LoginData, setLoginData} = useContext(LoginContext);
    //console.log(LoginData.ValidUserOne.fname[0])
    const fname = LoginData?.ValidUserOne?.fname ?? '';
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const LogoutUser = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch(`${BASE_URL}/logout`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept: "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        console.log(data);

        if (data.status === 201) {
            console.log("user logout");
            localStorage.removeItem("usersdatatoken");
            setLoginData(false)
            navigate("/");
        } else {
            console.log("error");
        }
    }

    const goDash = () => {
        navigate("/dash")
    }

    const goError = () => {
        navigate("*")
    }

    return (
        <header>
            <nav>   
                <h1><NavLink to="/"style={{textDecoration:"none",color:"#121313"}} > ST</NavLink></h1>
                <div className ="avtar">
                    {
                        LoginData.ValidUserOne ? 
                            <Avatar style={{backgroundColor:"salmon",fontweight:"bold",textTransform: "capitalize" }} onClick={handleClick}>
                                {fname ? fname[0].toUpperCase() : ''}
                            </Avatar>
                            : <Avatar style={{backgroundColor:"#3b3e41"}} onClick={handleClick}/>
                    }
                    
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            LoginData.ValidUserOne ? (
                                <>
                                    <MenuItem onClick={() => {
                                        goDash()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                    <MenuItem onClick={() => {
                                        LogoutUser()
                                        handleClose()
                                    }}>Logout</MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem onClick={() => {
                                        goError()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                </>
                            )
                        }
                    </Menu>
                </div>
            </nav>
        </header>
    )
}

export default Header