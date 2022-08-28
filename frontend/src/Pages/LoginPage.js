import { memo, useEffect, useState } from "react";
import Login from "../Components/Forms/Login";
import Register from "../Components/Forms/Register";
import "../styles/login.css"

function LoginPage(props) {
    const [isLoginFormEnabled, setIsLoginFormEnabled] = useState(true);

    function transitionForm() {
        setIsLoginFormEnabled(!isLoginFormEnabled);
    }

    useEffect(() => {
        const r_changer = document.getElementById("changeForm");
        r_changer.addEventListener("click", transitionForm);

        return () => {
            r_changer.removeEventListener("click", transitionForm);
        }
    }, [isLoginFormEnabled]);

    return (
        <div id="login-page" className="min-vh-100">
            { isLoginFormEnabled ? <Login /> : <Register /> }
        </div>
    );
}

export default memo(LoginPage);