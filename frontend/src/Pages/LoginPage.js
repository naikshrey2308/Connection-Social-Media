import { memo, useEffect, useState, useContext } from "react";
import Login from "../Components/Forms/Login";
import Register from "../Components/Forms/Register";
import "../styles/login.css"
import LoginContext from "../Contexts/loginContext";

function LoginPage(props) {
    const { isLoginFormEnabled, setIsLoginFormEnabled } = useContext(LoginContext);

    function transitionForm() {
        setIsLoginFormEnabled(!isLoginFormEnabled);
    }

    useEffect(() => {}, [isLoginFormEnabled]);

    return (
        <div id="login-page" className="min-vh-100">
            { isLoginFormEnabled ? <Login /> : <Register /> }
        </div>
    );
}

export default memo(LoginPage);