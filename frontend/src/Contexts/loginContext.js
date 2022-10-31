import { createContext, useState, useRef } from "react";

const LoginContext = createContext();

export const LoginProvider = ({children}) => {
    const [isLoginFormEnabled, setIsLoginFormEnabled] = useState(true);

    return (
        <LoginContext.Provider value = {{
            "isLoginFormEnabled": isLoginFormEnabled, 
            'setIsLoginFormEnabled': setIsLoginFormEnabled,
        }}>
        {children}
        </LoginContext.Provider>
    );
}

export default LoginContext;