import React, { createContext, useState } from 'react';

export const LoginContext = createContext("");

const ContextProvider = ({ children }) => {
    const [LoginData,setLoginData] = useState("");

    return (
        <LoginContext.Provider value={{LoginData,setLoginData}}>
            {children}
        </LoginContext.Provider>
    );
};

export default ContextProvider;